import { H4 } from "../headers/H4";
import { PenIcon } from "../icons/pen_icon";
import { MainButton } from "../main_button/main_button";

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
                  <div className="w-full flex justify-between items-center pb-4 border-b border-gray-400 mb-7">
                  <H4 label="Comentarios"/>
                  <MainButton 
                        text="Únete al debate" 
                        color="secondary"
                        type="fill"
                        icon={<PenIcon />}
                  />
                  </div>
                  <div className="flex flex-col gap-7">
                        {items.map((item, index) => <div key={index}>
                              { renderBox(item, index) }
                        </div>)}
                  </div>
            </div>
      );
};