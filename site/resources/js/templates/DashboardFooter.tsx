import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import useUserProfile from '@customHooks/useUserProfile';

// Redux
import { useAppSelector } from '@redux/hook';
import { UserType } from '@redux/reducers/auth';

//others
import { Bookmark, Chat, Home, User, Work } from '@assets/icons';

const iconProps = {
  width: 28,
  height: 28,
};

const DashboardFooter = () => {
  const { userType } = useUserProfile();
  const navigate = useNavigate();
  const location = useLocation();

  const { isChatPolicyAccepted, tabUnseenCount } = useAppSelector(
    state => state.chat,
  );

  const path = location?.pathname ?? '';
  const focusedColor = 'text-BLUE_004D80';
  const unfocusedColor = 'text-slate-400';

  return (
    <footer className="sticky bottom-0 flex flex-row justify-around gap-2 py-3 px-6 bg-white/80 backdrop-blur-md border-t border-slate-200/40 z-[1000] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300">
      {TAB_MENUS.map(item => {
        if (item?.hidden === userType) {
          return null;
        }
        const Icon = item.icon;
        let route = item.route;
        const isChatTab = item.name === 'chat';
        if (isChatTab && !isChatPolicyAccepted) {
          route = '/chat-policy';
        }
        const isFocused = route === path;
        return (
          <button
            key={item.name}
            aria-label={item.name}
            onClick={() => navigate(route)}
            className="relative py-1.5 px-3 flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${isFocused ? 'bg-BLUE_004D80/10 scale-105 shadow-sm' : 'hover:bg-slate-100/50'}`}>
              <Icon
                {...iconProps}
                className={`transition-all duration-300 ${isFocused ? focusedColor : `${unfocusedColor} group-hover:text-slate-600`}`}
              />
            </div>
            {/* Active indicator dot */}
            <span className={`absolute bottom-0 w-1.5 h-1.5 rounded-full bg-BLUE_004D80 transition-all duration-300 ${isFocused ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />

            {isChatTab && tabUnseenCount > 0 && (
              <span className="h-2.5 w-2.5 rounded-full absolute top-1 right-2 bg-red-500 border border-white shadow-sm flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              </span>
            )}
          </button>
        );
      })}
    </footer>
  );
};

export default DashboardFooter;

const TAB_MENUS = [
  {
    name: 'home',
    route: '/home',
    icon: Home,
  },
  {
    name: 'bookmark',
    route: '/bookmark',
    icon: Bookmark,
  },
  {
    name: 'chat',
    route: '/chat',
    icon: Chat,
  },
  {
    name: 'jobs',
    route: '/jobs',
    icon: Work,
    hidden: UserType.JobSeeker,
  },
  {
    name: 'profile',
    route: '/profile',
    icon: User,
  },
];
