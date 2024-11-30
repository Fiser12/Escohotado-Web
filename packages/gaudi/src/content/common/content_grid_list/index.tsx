interface Props<T> {
    items: T[];
    renderBox: (item: T, index: number) => JSX.Element;
    gridCols?: string;
    gridColsSm?: string;
    gridColsMd?: string;
    gridColsLg?: string;
    gap?: string;
}

export const ContentGridList = <T,>({ 
    items, 
    renderBox, 
    gridCols = "grid-cols-1",
    gridColsSm = "sm:grid-cols-2",
    gridColsMd = "md:grid-cols-3",
    gridColsLg = "lg:grid-cols-4",
    gap = "gap-5"
}: Props<T>): JSX.Element => {
    return (
        <div className={`grid ${gridCols} ${gridColsSm} ${gridColsMd} ${gridColsLg} ${gap}`}>
            {items.map((item, index) => (
                <div key={index}>
                    {renderBox(item, index)}
                </div>
            ))}
        </div>
    );
};
