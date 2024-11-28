import React from 'react';
import classNames from 'classnames';
import { H3 } from '../common/headers/H3';

type Args = {
  title: string;
  price: string;
  features: string[];
  mainCard?: boolean;
  children?: React.ReactNode;
};

export const SubscriptionCard = ({
  title,
  price,
  features,
  mainCard = false,
  children,
}: Args): JSX.Element => {
  return (
    <div
      className={classNames(
        'w-96 h-96 p-10 rounded-sm border border-stone-300 flex-col justify-center items-center gap-6 inline-flex',
        {
          'bg-stone-100': mainCard,
          'bg-white': !mainCard,
        }
      )}
    >
      <div className="flex-col justify-start items-center gap-4 flex">
        <H3 label={title} />
        <div className="justify-start items-end gap-2.5 inline-flex">
          <div className="text-[#426578] text-2xl font-bold font-montserrat leading-normal">
            {price}
          </div>
          <div className="text-neutral-400 text-base font-normal font-montserrat leading-normal">
            al año
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
