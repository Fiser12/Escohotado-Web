import { SelectBox } from '../select_box';
import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    options: {
        label: string,
        id: string,
    }[]
    activeId: string
    onClickOption: (id: string) => void
}

export const SelectBoxes: React.FC<Props> = ({ onClickOption, activeId, options, className, ...rest }) => {
    const gridClass = classNames(
        'w-full flex flex-col min-[469px]:flex-row gap-4',
        className
    );

    return (
        <div className={gridClass} {...rest}>
            {options.map((option, index) => (
                <SelectBox
                    key={index}
                    title={option.label}
                    isSelected={option.id === activeId}
                    onClick={() => onClickOption(option.id)}
                />
            ))}
        </div>
    )
}
