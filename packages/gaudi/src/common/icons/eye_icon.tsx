import React from 'react';
import classNames from 'classnames';

interface Props {
      className?: string;
}

export const EyeIcon: React.FC<Props> = ({
      className
}) => {
      const iconClass = classNames(
            'stroke-current',
            className,
      );

      return (
            <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  className={iconClass}
                  xmlns="http://www.w3.org/2000/svg"
            >
                  <path d="M12.7618 6.33001C12.9151 6.51376 13 6.75248 13 7.00001C13 7.24754 12.9151 7.48626 12.7618 7.67001C11.7907 8.80002 9.5803 11 7 11C4.41971 11 2.20935 8.80002 1.23827 7.67001C1.0849 7.48626 1 7.24754 1 7.00001C1 6.75248 1.0849 6.51376 1.23827 6.33001C2.20935 5.2 4.41971 3 7 3C9.5803 3 11.7907 5.2 12.7618 6.33001Z" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7 8.5C7.82843 8.5 8.5 7.82843 8.5 7C8.5 6.17157 7.82843 5.5 7 5.5C6.17157 5.5 5.5 6.17157 5.5 7C5.5 7.82843 6.17157 8.5 7 8.5Z" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

      );
};