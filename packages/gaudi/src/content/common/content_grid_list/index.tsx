interface Props<T> {
    items: T[];
    renderBox: (item: T, index: number) => JSX.Element;
    gridCols?: string;
    gap?: string;
}

export const ContentGridList = <T,>({ 
    items, 
    renderBox, 
    gridCols = "md:grid-cols-3",
    gap = "gap-5"
}: Props<T>): JSX.Element => {
    return (
        <div className={`grid grid-cols-1 ${gridCols} ${gap}`}>
            {items.map((item, index) => (
                <div key={index}>
                    {renderBox(item, index)}
                </div>
            ))}
        </div>
    );
};
