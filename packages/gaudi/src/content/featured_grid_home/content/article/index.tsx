import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { H3 } from "../../../../common/headers/H3";
import { Link } from "../../../../common/links/link";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";

interface Props {
  title: string;
  author?: string;
  coverHref: string;
  href: string;
  categories: {
    id: string;
    singular_name: string;
    seed?: string | null;
  }[];
  className?: string;
}

export const FeaturedArticle = (props: Props) => {
  const containerClass = classNames("w-full h-full gap-2");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const contentClass = classNames("w-full h-full flex flex-col justify-between p-2 gap-2");
  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");
  const categoriesClass = classNames("flex flex-wrap gap-1");
  const authorClass = classNames("text-xs text-gray-dark");

  return (
    <>
      <style>
        {`
        .base-container-axis-article {
          container-type: inline-size;
        }
        .image-control-article {
            display: block;
            height: 100%;
          }
        .grid-axis-control-content-article {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
        }
        @container (min-width: 300px) {
          .grid-axis-control-content-article {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @container (max-width: 300px) {
          .image-control-article {
            display: none;
          }
        }
      `}
      </style>
      <BaseCardContainer className={`base-container-axis-article ${props.className}`}>
        <div className={`grid-axis-control-content-article ${containerClass}`}>
          <div className={`image-control-article ${containerImageClass}`}>
            <Image
              src={props.coverHref}
              alt={props.title}
              fill
              className="top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className={contentClass}>
            <div className={textareaClass}>
              <div className={categoriesClass}>
                {props.categories?.map((category, index) => (
                  <Tag key={index} text={category.singular_name}></Tag>
                ))}
              </div>
              <H3 label={props.title} className="line-clamp-3" />
              <p className={authorClass}>{props.author}</p>
            </div>
            <Link text="Leer más" href={props.href} />
          </div>
        </div>
      </BaseCardContainer>
    </>
  );
};
