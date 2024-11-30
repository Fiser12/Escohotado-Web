interface Props<T> {
    items: T[];
    renderBox: (item: T, index: number) => JSX.Element;
    gridCols?: string;
    gap?: string;
}

export const ContentGridList = <T,>({ 
    items, 
    renderBox, 
    gridCols = "grid-cols-3",
    gap = "gap-2"
}: Props<T>): JSX.Element => {
    return (
        <div className={`grid ${gridCols} ${gap}`}>
            {items.map((item, index) => (
                <div key={index}>
                    {renderBox(item, index)}
                </div>
            ))}
        </div>
    );
};
