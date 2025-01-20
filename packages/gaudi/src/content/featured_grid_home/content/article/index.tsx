import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { Link } from "../../../../common/links/link";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";
import { UnlockIcon } from "../../../../common/icons/unlock_icon";
import "./style.css";

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
  hasPermission: boolean;
  className?: string;
  isPdf: boolean;
}

export const FeaturedArticle = (props: Props) => {
  const containerClass = classNames("w-full h-full");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const imageClass = classNames(
    "top-0 left-0 w-full h-full object-cover",
    {
      'opacity-100': props.hasPermission,
      'opacity-40': !props.hasPermission,
    }
  );
  const contentClass = classNames("w-full h-full flex flex-col justify-between p-2 gap-2");
  const textareaClass = classNames("h-full flex flex-col gap-2.5");
  const categoriesClass = classNames("flex flex-wrap gap-1");
  const authorClass = classNames("text-xs text-gray-dark");
  const titleClass = classNames(
    "line-clamp-3 font-display",
    {
      'text-black': props.hasPermission,
      'text-gray-dark': !props.hasPermission,
    }
  );

  return (
    <BaseCardContainer className={`base-container-axis-article ${props.className}`}>
      <div className={`${!props.isPdf && 'grid-axis-control-content-article'} ${containerClass}`}>
        {!props.isPdf &&
          <div className={`image-control-article ${containerImageClass}`}>
            <Image
              fill
              src={props.coverHref}
              alt={props.title}
              className={imageClass}
            />
          </div>
        }
        <div className={contentClass}>
          <div className={`text-content-position-article ${textareaClass}`}>
            <div className={categoriesClass}>
              {props.categories?.map((category, index) => (
                <Tag key={index} text={category.singular_name} variant={props.hasPermission ? 'primary' : 'disabled'}></Tag>
              ))}
            </div>
            <p className={`dynamic-text-article ${titleClass}`}>{props.title}</p>
            <p className={authorClass}>{props.author}</p>
          </div>
          {!props.hasPermission &&
            <div className="group flex justify-end items-center gap-1.5 text-primary-400 pt-4">
              <UnlockIcon className="w-3 mb-1 group-hover:animate-bounce" />
              <Link text="Desbloquear" href={props.href} />
            </div>
          }
        </div>
      </div>
    </BaseCardContainer>
  );
};