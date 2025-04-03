import { PenIcon } from "@/components/assets/icons";
import { MainButton } from "@/components/atoms/main-button";
import { Typo } from "@/components/atoms/typographies";

interface Props<T> {
      items: T[];
      forumTopicId?: string | null;
      renderBox: (item: T, index: number) => React.ReactNode;
}

const generateTopicHref = (forumTopicId: string) => {
      return `${process.env.FORUM_URL}/topic/${forumTopicId}`;
}
export const GridComments: React.FC<Props<any>> = ({
      items,
      forumTopicId,
      renderBox,
}): React.ReactNode => {
      return (
            <div className="w-full pb-8">
                  <div className="w-full flex justify-between items-center pb-4 border-b border-gray-400 mb-7">
                        <Typo.H4 className='w-full'>Comentarios</Typo.H4>
                        {forumTopicId &&
                              <a href={generateTopicHref(forumTopicId)} target="_blank" rel="noreferrer">
                                    <MainButton
                                          className="whitespace-nowrap flex-shrink-0"
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
                              {renderBox(item, index)}
                        </div>)}
                  </div>
            </div>
      );
};