import React from 'react';
import classNames from 'classnames';

interface Args {
  text: string;
  variant?: 'primary' | 'secondary' | 'transparent';
  noBreak?: boolean;
  classname?: string;
  fitContent?: boolean;
}

export const EscotaButton = ({
  text,
  variant = 'primary',
  noBreak = false,
  classname = '',
  fitContent = true,
}: Args): JSX.Element => {
  const buttonClass = classNames(
    'px-4 py-2.5 rounded-[3px] justify-center items-center gap-1 flex text-center font-montserrat',
    classname,
    {
      'bg-generic-bg-dark text-white': variant === 'primary',
      'border border-generic-bg-dark text-generic-bg-dark': variant === 'secondary',
      'text-[#222222] text-sm font-bold leading-none': variant === 'transparent',
      'text-xs font-normal': variant !== 'transparent',
      'whitespace-nowrap': noBreak,
      'leading-3': !noBreak,
      'inline-flex': fitContent,
      'w-full': !fitContent,
    }
  );

  return (
    <div className={buttonClass}>
      {text}
    </div>
  );
};