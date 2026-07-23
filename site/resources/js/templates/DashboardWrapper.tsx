import React from 'react';

// Components
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';

// Hooks
import usePageView from '@customHooks/usePageView';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const DashboardWrapper = (props: Props) => {
  usePageView();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50/50 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0f2fe]/30 font-sans">
      <DashboardHeader />
      <div
        className={`flex-1 flex flex-col overflow-y-auto overflow-x-hidden ${props.className ?? ''}`}>
        <div
          className={
            'max-w-4xl w-full py-6 px-4 sm:px-8 flex flex-col flex-1 mx-auto mb-6 transition-all duration-300'
          }>
          {props.children}
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardWrapper;
