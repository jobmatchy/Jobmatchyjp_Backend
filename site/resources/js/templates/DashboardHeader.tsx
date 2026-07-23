import React from 'react';

// Components
import LanguagePopper from '@components/LanguagePopper';
import SettingsPopover from '@components/SettingsPopover';
import { AppLogo, AppNameIcon } from '@components/common';

// Hooks
import useUserProfile from '@customHooks/useUserProfile';

// Others
import { LogoutSvg } from '@assets/icons/settingsIcons';

const DashboardHeader = () => {
  const { handleLogout, isProfileComplete } = useUserProfile();

  return (
    <nav className="sticky top-0 px-6 py-2 h-[64px] flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200/40 shadow-sm z-[1000] transition-all duration-300">
      <button
        aria-label="homepage"
        className="flex gap-2 items-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        onClick={() => (window.location.href = '/home')}>
        <AppLogo small />
        <AppNameIcon small />
      </button>
      <div className="flex gap-4 items-center">
        <div className="transition-transform duration-200 hover:scale-105">
          <LanguagePopper />
        </div>
        {isProfileComplete && (
          <div className="transition-transform duration-200 hover:scale-105">
            <SettingsPopover />
          </div>
        )}
        <button
          aria-label="logout"
          className="p-2 rounded-full hover:bg-red-50/80 text-slate-500 hover:text-red-500 transition-all duration-200 hover:scale-110 active:scale-90 flex items-center justify-center cursor-pointer"
          onClick={() => handleLogout()}
        >
          <LogoutSvg
            width={20}
            height={20}
          />
        </button>
      </div>
    </nav>
  );
};

export default DashboardHeader;
