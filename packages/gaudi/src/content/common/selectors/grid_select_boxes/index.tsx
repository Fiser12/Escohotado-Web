"use client";

import { useState } from 'react';
import { SelectBox } from '../select_box';
import classNames from 'classnames';

type Props = {
    options: {
        label: string, 
        id: string,
    }[]
}

export const SelectBoxes = ({options}: Props): JSX.Element => {
    const [activeId, setActiveId] = useState(null as string | null)

    const gridClass = classNames(
        'w-full flex flex-col min-[469px]:flex-row gap-4'
    );

    return (
        <div className={gridClass}>
        { options.map(option => (
            <SelectBox
                title={option.label}
                isSelected={option.id === activeId}
                onClick={() => setActiveId(option.id)}
            />
        )) }
        </div>
    )
}
