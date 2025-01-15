import classNames from "classnames";
import { Tag } from "../../../common/tag/tag";
import { H3 } from "../../../common/headers/H3";
import { Link } from "../../../common/links/link";
import Image from "next/image";

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

  const containerClass = classNames(
    props.className,
    "w-full h-full md:min-h-[360px] max-h-[500px] grid gap-2 bg-white p-1 rounded @sm:grid-cols-1 @lg:grid-cols-2",
  );

  const imageClass = classNames(
    "w-full h-full object-cover"
  );

  const contentClass = classNames("flex flex-col justify-between p-2 gap-2");

  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");

  const categoriesClass = classNames("flex flex-wrap gap-1");

  const authorClass = classNames("text-xs text-gray-dark");

  return (
    <div className="@container">
      <div className={containerClass}>
        <div className="relative w-full rounded overflow-hidden hidden sm:block">
          <Image
            fill
            src={props.coverHref}
            alt={props.title}
            className={imageClass}
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
    </div>
  );

};
