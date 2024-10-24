"use client";

import React, { useState } from 'react';
import classNames from 'classnames';

type ButtonOption = {
  id: string;
  label: string;
  sublabel?: string;
};

type Args = {
  options: ButtonOption[];
  selected: ButtonOption;
  setOption: (option: ButtonOption) => void;
};

export const ToggleButtonGroup = ({
  options,
  selected,
  setOption,
}: Args): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(
    options.map((option) => option.id).indexOf(selected.id)
  );

  const handleClick = (option: ButtonOption, index: number) => {
    setOption(option);
    setActiveIndex(index);
  };

  return (
    <div className="px-1 py-1 bg-stone-100 rounded-full justify-start items-center gap-6 inline-flex">
      <div className="self-stretch justify-start items-center gap-2 flex">
        {options.map((option, index) => (
          <div className="relative" key={option.id}>
            {index === activeIndex && (
              <div
                className="absolute left-0 h-full bg-white rounded-full pointer-events-none w-full selected-interval"
                aria-hidden="true"
              ></div>
            )}
            <button
              className={classNames(
                'relative flex text-xs h-8 rounded-full gap-1 transition-colors duration-150 ease-in-out font-montserrat justify-center items-center mx-2',
                {
                  'text-black font-bold': selected.id === option.id,
                  'text-neutral-400 font-normal': selected.id !== option.id,
                }
              )}
              onClick={() => handleClick(option, index)}
              aria-pressed={selected.id === option.id}
            >
              {option.label}
              {option.sublabel && (
                <span className="text-slate-600 text-xs font-montserrat leading-3">
                  {option.sublabel}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};