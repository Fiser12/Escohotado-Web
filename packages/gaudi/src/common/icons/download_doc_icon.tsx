import React from 'react';
import classNames from 'classnames';

interface Args {
      className?: string;
      color?: 'default' | 'primary' | 'secondary';
}

export const DownloadDocIcon = ({
      className = '',
      color = 'default',
}: Args): JSX.Element => {
      const iconClass = classNames(
            'h-4',
            className,
            {
                  'text-white': color === 'default',
                  'text-primary-900': color === 'primary',
                  'text-primary-300': color === 'secondary',
            }
      );

      return (
            <svg
                  className={iconClass}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
            >
                  <path d="M11.6486 11.6485C11.6486 11.8727 11.5595 12.0877 11.4011 12.2462C11.2426 12.4046 11.0276 12.4937 10.8034 12.4937H3.19675C2.97259 12.4937 2.75762 12.4046 2.59911 12.2462C2.44061 12.0877 2.35156 11.8727 2.35156 11.6485V2.35147C2.35156 2.12731 2.44061 1.91234 2.59911 1.75384C2.75762 1.59533 2.97259 1.50629 3.19675 1.50629H8.69047L11.6486 4.46444V11.6485Z" stroke="currentColor" stroke-width="0.845188" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.69032 7.84521L6.99995 9.53559L5.30957 7.84521" stroke="white" stroke-width="0.845188" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7 9.53559V4.88705" stroke="currentColor" stroke-width="0.845188" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
      );
};
