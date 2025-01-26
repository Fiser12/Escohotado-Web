"use client";

import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    title: string;
    isSelected: boolean;
    onClick: () => void;
};

export const SelectBox: React.FC<Props> = ({title, className, isSelected, onClick, ...rest}) => {
    const buttonClass = classNames(
        'relative min-[439px]:max-w-[200px] w-full h-[80px] flex flex-col justify-center items-center rounded border-[1.5px] font-body px-8 hover:bg-gray-light hover:border-primary-50 focus:bg-primary-50',
        className,
        {
            'border-primary-200 bg-primary-50 font-bold text-primary-400': isSelected,
            'border-primary-100 bg-transparent': !isSelected,
        },
    );

    const checkboxClass = classNames(
        'absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center p-1 m-2 rounded border-[1.5px] text-primary-400 bg-white',
        className,
        {
            'border-primary-100': isSelected,
            'border-gray-disabled': !isSelected,
        },
    );

    return (
        <button
            {...rest}
            onClick={onClick}
            className={buttonClass}
        >
            <p className='line-clamp-2'>{title}</p>
            <div className={checkboxClass}>
                {isSelected && (
                    <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className='stroke-current w-full'
                    >
                        <path d="M2 8.19232L4.1 10.8923C4.17086 10.9844 4.26166 11.0592 4.36558 11.1112C4.46949 11.1631 4.58383 11.1909 4.7 11.1923C4.8143 11.1937 4.92746 11.1694 5.03125 11.1216C5.13504 11.0737 5.22685 11.0032 5.3 10.9154L12 2.80771"
                            strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
        </button>
    );
};