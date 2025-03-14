import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { H4 } from "../../../../common/headers/H4";
import { H1 } from "../../../../common/headers/H1";
import { MainButton } from "../../../../common/main_button/main_button";
import { DownloadDocIcon } from "../../../../common/icons/download_doc_icon";
import { SocialMediaShare } from "../../../../common/social_media";
import { CategoryModel } from "hegel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      title: string;
      publishedAt: string;
      author?: string;
      href?: string | null;
      detailHref: string;
      hasPermission: boolean;
      categories: CategoryModel[];
      coverHref?: string;
      children: React.ReactNode;
}


export const ArticleDetailPdf: React.FC<Props> = ({ publishedAt, author, title, categories, href, children, coverHref, hasPermission, detailHref, ...rest }) => {
      const tagDateContainerClass = classNames(
            'flex flex-col md:flex-row gap-3 justify-between'
      );

      const categoriesClass = classNames(
            'flex flex-wrap gap-1'
      );
      const date = new Date(publishedAt);
      const formattedDate = date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
      });

      return (
            <div {...rest}>
                  <ContentWrapper>
                        <div className="w-full min-h-[460px] flex flex-col justify-center">
                              <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                                    <div className="flex flex-col gap-2">
                                          <H4 label={author ?? ""}></H4>
                                          <H1 label={title ?? "No title"} />
                                    </div>
                                    <div className={tagDateContainerClass}>
                                          <div className={categoriesClass}>
                                                {categories?.map((category, index) =>
                                                      <Tag key={index} text={category.label}></Tag>
                                                )}
                                          </div>
                                          <p className="text-gray-disabled">{formattedDate}</p>
                                    </div>
                              </div>
                              <div className="flex justify-between items-center py-5">
                                    {hasPermission && href &&
                                          <a href={href ?? "#"} target="_blank">
                                                <MainButton
                                                      text="Descargar PDF"
                                                      icon={<DownloadDocIcon />}
                                                />
                                          </a>
                                    }
                                    <SocialMediaShare
                                          textToShare={`Quiero compartir con vosotros el artículo ${author ? `de ${author}` : ""}: ${title}`}
                                          relativeLink={detailHref}
                                          tags={["Artículo", author?.replace(" ", "")].mapNotNull(it => it)}
                                    />
                              </div>
                        </div>
                  </ContentWrapper>
                  {children}
            </div>
      );
}