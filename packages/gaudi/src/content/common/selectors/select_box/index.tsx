import classNames from 'classnames';

type Props = {
    title: string;
    isSelected: boolean;
    onClick: () => void
    className?: string;
};

export const SelectBox = (props: Props): JSX.Element => {
    const buttonClass = classNames(
        'relative w-[200px] h-[80px] flex flex-col justify-center items-center rounded border-2 font-body px-8 hover:bg-gray-light focus:bg-primary-50',
        props.className,
        {
            'border-primary-100 bg-primary-50 font-bold text-primary-400': props.isSelected,
            'border-gray-light bg-white': !props.isSelected,
        },
    );

    const checkboxClass = classNames(
        'absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center p-1 m-2 rounded border-2 text-primary-400  bg-white',
        props.className,
        {
            'border-primary-100': props.isSelected,
            'border-gray-light': !props.isSelected,
        },
    );

    return (
        <button
            onClick={props.onClick}
            className={buttonClass}
        >
            <p className='line-clamp-2'>{props.title}</p>
            <div className={checkboxClass}>
                {props.isSelected && (
                    <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className='stroke-current'
                    >
                        <path d="M2 8.19232L4.1 10.8923C4.17086 10.9844 4.26166 11.0592 4.36558 11.1112C4.46949 11.1631 4.58383 11.1909 4.7 11.1923C4.8143 11.1937 4.92746 11.1694 5.03125 11.1216C5.13504 11.0737 5.22685 11.0032 5.3 10.9154L12 2.80771"
                            strokeWidth="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                )}
            </div>
        </button>
    );
};