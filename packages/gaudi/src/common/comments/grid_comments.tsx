import { H4 } from "../headers/H4";
import { PenIcon } from "../icons/pen_icon";
import { MainButton } from "../main_button/main_button";

interface Props<T> {
      items: T[];
      forumTopicId?: string | null;
      renderBox: (item: T, index: number) => JSX.Element;
}

const generateTopicHref = (forumTopicId: string) => {
      return `https://foro.laemboscadura.com/topic/${forumTopicId}`;
}
export const GridComments = <T,>({ 
      items, 
      forumTopicId,
      renderBox, 
}: Props<T>): JSX.Element => {
      return (
            <div className="w-full pb-8">
                  <div className="w-full flex justify-between items-center pb-4 border-b border-gray-400 mb-7">
                  <H4 label="Comentarios"/>
                  {forumTopicId &&
                        <a href={generateTopicHref(forumTopicId)} target="_blank" rel="noreferrer">
                              <MainButton 
                                    text="Únete al debate" 
                                    color="secondary"
                                    type="fill"
                                    icon={<PenIcon />}
                              />
                        </a>
                  }
                  </div>
                  <div className="flex flex-col gap-7">
                        {items.length === 0 && <p className="text-gray-500">Aún no hay comentarios</p>}
                        {items.map((item, index) => <div key={index}>
                              { renderBox(item, index) }
                        </div>)}
                  </div>
            </div>
      );
};