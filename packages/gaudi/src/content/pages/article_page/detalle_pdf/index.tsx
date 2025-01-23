import { GridComments } from "../../../../common/comments/grid_comments";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { CommentCard } from "../../../../common/comments";
import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { H4 } from "../../../../common/headers/H4";
import { H1 } from "../../../../common/headers/H1";
import { MainButton } from "../../../../common/main_button/main_button";
import { DownloadDocIcon } from "../../../../common/icons/download_doc_icon";
import { CommentsSectionModel } from "hegel";

interface Props {
      title: string;
      publishedAt: string;
      author?: string;
      coverHref: string;
      href?: string | null;
      categories: {
            id: string;
            singular_name: string;
            seed?: string | null
      }[];
      commentsSectionModel: CommentsSectionModel;
      children: React.ReactNode;
}


export const ArticleDetailPdf = (props: Props) => {
      const tagDateContainerClass = classNames(
            'flex flex-col md:flex-row gap-3 justify-between'
      );

      const categoriesClass = classNames(
            'flex flex-wrap gap-1'
      );
      const date = new Date(props.publishedAt);
      const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
      });

      return (
            <div>
                  <ContentWrapper>
                        <div className="w-full min-h-[460px] flex flex-col justify-center">
                              <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                                    <div className="flex flex-col gap-2">
                                          <H4 label={props.author ?? ""}></H4>
                                          <H1 label={props.title ?? "No title"} />
                                    </div>
                                    <div className={tagDateContainerClass}>
                                          <div className={categoriesClass}>
                                                {props.categories?.map((category, index) =>
                                                      <Tag key={index} text={category.singular_name}></Tag>
                                                )}
                                          </div>
                                          <p className="text-gray-disabled">{formattedDate}</p>
                                    </div>
                              </div>
                              {props.href &&
                                    <div className="mt-6">
                                          <a href={props.href ?? "#"} target="_blank">
                                                <MainButton
                                                      text="Descargar PDF"
                                                      icon={<DownloadDocIcon />}
                                                />
                                          </a>
                                    </div>

                              }
                        </div>
                  </ContentWrapper>
                  {props.children}
                  <ContentWrapper>
                        <GridComments
                              forumTopicId={props.commentsSectionModel.forumTopicId}
                              items={props.commentsSectionModel.comments}
                              renderBox={(comment) => (
                                    <CommentCard
                                          user={comment.user}
                                          date={comment.date}
                                          comment={comment.comment}
                                    />
                              )}
                        /> 
                 </ContentWrapper>
            </div>
      );
}