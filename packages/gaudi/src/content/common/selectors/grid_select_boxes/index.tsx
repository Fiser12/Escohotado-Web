import { SelectBox } from '../select_box';
import classNames from 'classnames';

type Props = {
    options: {
        label: string, 
        id: string,
    }[]
    activeId: string
    onClick: (id: string) => void
}

export const SelectBoxes = (props: Props): JSX.Element => {
    const gridClass = classNames(
        'w-full flex flex-col min-[469px]:flex-row gap-4'
    );

    return (
        <div className={gridClass}>
        { props.options.map((option, index) => (
            <SelectBox
                key={index}
                title={option.label}
                isSelected={option.id === props.activeId}
                onClick={() => props.onClick(option.id)}
            />
        )) }
        </div>
    )
}
