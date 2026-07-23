const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Redis = require('redis');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const PORT = process.env.PORT || 3000;

const config = {
    url: process.env.REDIS_URL
}

// console.log('config', config) for debuging purpose

 const redisClient = Redis.createClient(config);


let socket;

redisClient.on('connect', () => {
    console.log('Connected to Redis');
    // save to redis and fetch in laravel
    console.log('redis set is fired')
});

redisClient.on('ready', () => {
    console.log('Redis client connected and ready to use...');
     //  redis client connected
});

redisClient.on('error', (err) => {
    console.error('Redis error', err);
});

async function init() {
    
    io.on('connection', (connectedSocket) => {
        socket = connectedSocket;
        const { userId, userToken } = socket.handshake.query;
        console.log('socket connect'+userToken);
        socket.join(userId);
        socket.on('getTotalRequest', async (data) => {
            // try {
            axios.get('http://nginx/api/v1/matching/count', {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                timeout: 15000, // 15 seconds
            }).then(response => {
                    if (socket) {
                        const UserId = response.data.data.totalRequest.user_id;
                        io.to(`${socket.id}`).emit(`${UserId}-totalRequest`, `${response.data.data.totalRequest.totalRequest}`);
                    }
            }).catch(error => {
                    io.to(`${socket.id}`).emit('totalRequest', error.message);
            });

        });
        socket.on('getChatUnseenCount', async (data) => {
            // try {
              
            axios.get('http://nginx/api/v1/chat/count', {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                timeout: 15000, // 15 seconds
            }).then(response => {
                    if (socket) {
                        const UserId = response.data.data.totalChatCount.receiveBy; 
                        io.to(`${socket.id}`).emit(`${UserId}-chatUnseenCount`, {'unseenCount':response.data.data.totalChatCount.unseenCount,'badgeCount':response.data.data.totalChatCount.badgeCount});
                    }
                    
            }).catch(error => {
                    io.to(`${socket.id}`).emit('chatUnseenCount', error.message);
            });

         });
         socket.on('connectChatRoomCheck', async (data) => {
            const { userId, roomId, type} = data;
            console.log('event fired for set chat room');
            axios.post('http://nginx/api/v1/chat-room/join', {
                // Data to be sent in the request body
                // Modify this object according to your API requirements
                userId: userId,
                roomId:  roomId,
                type:type
            }, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                timeout: 15000, // 15 seconds
            }).then(response => {
                console.log('this is response of api'+response)
                if (socket) {
                     return response;
                }
            }).catch(error => {
                return error;
            });
      
           
         });
    });
    
    server.listen(PORT, () => console.log(process.env.SOCKET_URL));

    try {
        await redisClient.connect();

        await redisClient.subscribe("jobmatchy_database_chat", (message) => {
                 const payload = JSON.parse(message);
                 const targetUserId = payload.data.receiveBy;
                 console.log('chat done');
                 if (socket) {
                 const  chatMessage = JSON.stringify(payload.data.room);
                 io.to(String(targetUserId)).emit(`${targetUserId}-chatMessage`, chatMessage);
                     
                 }
        });
        await redisClient.subscribe("jobmatchy_database_chat_seen_event", (message) => {
            const payload = JSON.parse(message);
            const targetUserId = payload.data.userId;
            console.log('chat seen event fire '+targetUserId+'roomId'+payload.data.roomId+'lastSeenTime'+payload.data.lastSeenTime)
            if (socket) {
            io.to(String(targetUserId)).emit(`${targetUserId}-chatSeenEvent`, {'roomId':payload.data.roomId,'lastSeenTime':payload.data.lastSeenTime});
                
            }
        });
        await redisClient.subscribe("jobmatchy_database_chat_unseen_count", (message) => {
            const payload = JSON.parse(message);
            const targetUserId = payload.data.receiveBy;
            console.log('user --'+targetUserId+'total unseen--'+payload.data.unseenCount+'badge count'+payload.data.badgeCount)
            if (socket) {
            const  chatMessage = JSON.stringify(payload.data);
            io.to(String(targetUserId)).emit(`${targetUserId}-chatUnseenCount`, {'unseenCount':payload.data.unseenCount,'badgeCount':payload.data.badgeCount});
                
            }
        });
        await redisClient.subscribe("jobmatchy_database_super_chat", (message) => {
            const payload = JSON.parse(message);
            const targetUserId = payload.data.receiveBy;
            console.log('user --'+targetUserId+'room id--'+payload.data.chatRoomId)
            if (socket) {
            const  chatMessage = JSON.stringify(payload.data);
            io.to(String(targetUserId)).emit(`${targetUserId}-chatRefresh`, chatMessage);
                
            }
        });
        await redisClient.subscribe("jobmatchy_database_matched", (user) => {
            
            const payload = JSON.parse(user);
           
            const userId = payload.data.user_id;
            console.log('Matched event notify to user'+userId);
            if (userId) {
             const  user = JSON.stringify(payload.data);
            io.to(String(userId)).emit(`${userId}-matched`, user);
                
            }
         });
         await redisClient.subscribe("jobmatchy_database_chat_refresh", (user) => {
            
            const payload = JSON.parse(user);
           
            const userId = payload.data.user_id;
          
            if (userId) {
             const  user = JSON.stringify(payload.data);
            io.to(String(userId)).emit(`${userId}-chatRefresh`, user);
                
            }
         });

        await redisClient.subscribe("jobmatchy_database_request_count", (message) => {
            if (socket) {
                const payload = JSON.parse(message);
                const totalRequest = payload.data.totalRequest;
                const userId = payload.data.user_id;
                io.to(String(userId)).emit(`${userId}-totalRequest`, totalRequest);
               
            }
        });
        await redisClient.subscribe("jobmatchy_database_subscription_action", (message) => {
            if (socket) {
                const payload = JSON.parse(message);
                const userId = payload.data.userId;
                console.log(userId);
                // const subscriptionDetails = payload.data.subscriptionDetails;
                io.to(String(userId)).emit(`${userId}-refreshSubscription`, message);
               
            }
        });
    } catch (err) {
        console.error('Error subscribing to the channel:', err);
    }

    io.on('disconnect', () => {
        const { userId } = socket.handshake.query;
        socket.leave(userId);
        console.log(`User ${userId} disconnected`);
    });
}

init();