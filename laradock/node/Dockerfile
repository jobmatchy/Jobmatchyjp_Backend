FROM node:14-alpine

# Install NGINX
RUN apk add --no-cache nginx

# Create a directory to hold the application code inside the container
WORKDIR /usr/src/app/node

# Copy 'socketserver' project package files to the working directory in the container
COPY package*.json ./

# Install application dependencies inside 'socketserver' folder
RUN npm install

# Copy the entire application to the container
COPY . .

# Install PM2 globally to manage Node.js processes
RUN npm install -g pm2

# Expose the port on which the Node.js app will run
EXPOSE 3004

# Start NGINX and Node.js using PM2
CMD ["sh", "-c", "nginx && pm2-runtime start app.js --name node --watch --no-autorestart"]
