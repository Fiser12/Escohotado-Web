import { Typo } from '@/components/atoms/typographies';
import classNames from 'classnames';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  interval: 'day' | 'week' | 'month' | 'year';
  features: string[];
  mainCard?: boolean;
  children?: React.ReactNode;
};

export const SubscriptionCard: React.FC<Props> = ({
  title,
  price,
  interval,
  features,
  mainCard = false,
  children,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames(
        'w-96 h-96 p-10 rounded-sm border border-stone-300 flex-col justify-center items-center gap-6 inline-flex',
        className,
        {
          'bg-stone-100': mainCard,
          'bg-white': !mainCard,
        }
      )}
    >
      <div className="flex-col justify-start items-center gap-4 flex">
        <Typo.H3 className='w-full'>{title}</Typo.H3>
        <div className="justify-start items-end gap-2.5 inline-flex">
          <div className="text-[#426578] text-2xl font-bold font-montserrat leading-normal">
            {price}
          </div>
          <div className="text-neutral-400 text-base font-normal font-montserrat leading-normal">
            {
              {
                day: 'al día',
                week: 'a la semana',
                month: 'al mes',
                year: 'al año',
              }[interval]
            }
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-5 flex">
        {features.map((feature, index) => (
          <div key={index} className="justify-start items-center gap-1 inline-flex">
            <div className="w-3.5 h-3.5 px-0.5 py-0.5 justify-center items-center flex"></div>
            <div className="text-neutral-800 text-sm font-normal font-montserrat leading-none">
              {feature}
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};
