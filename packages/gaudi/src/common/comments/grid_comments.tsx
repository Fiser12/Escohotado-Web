import { H4 } from "../headers/H4";

interface Props<T> {
      items: T[];
      renderBox: (item: T, index: number) => JSX.Element;
}

export const GridComments = <T,>({ 
      items, 
      renderBox, 
}: Props<T>): JSX.Element => {
      return (
            <div className="w-full pb-8">
                  <div className="w-full pb-4 border-b border-gray-400 mb-7">
                  <H4 label="Comentarios"/>
                  </div>
                  <div className="flex flex-col gap-7">
                        {items.map((item, index) => <div key={index}>
                              { renderBox(item, index) }
                        </div>)}
                  </div>
            </div>
      );
};