import React from 'react';

// Components
import { Title } from '@components/common';

interface Props {
  title: string;
  icon?: any;
}
const TagLabel = ({ title, icon }: Props) => {
  const Icon = icon;
  const isLocation = !!icon;
  return (
    <div
      className={`flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full border transition-all duration-200 ${
        isLocation
          ? 'bg-blue-50/70 border-blue-100/60 text-blue-700'
          : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100/70'
      }`}>
      {icon && <Icon width={12} height={12} className={isLocation ? 'text-blue-600' : 'text-slate-500'} />}
      <Title
        type="caption2"
        textTypeClassName="text-[11px] font-semibold tracking-wide"
        className={isLocation ? 'text-blue-700' : 'text-slate-600'}
      >
        {title}
      </Title>
    </div>
  );
};

export default TagLabel;
