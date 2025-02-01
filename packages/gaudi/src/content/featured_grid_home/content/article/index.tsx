import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { Link } from "../../../../common/links/link";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";
import { UnlockIcon } from "../../../../common/icons/unlock_icon";
import "./style.css";
import { CategoryModel } from "hegel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  author?: string;
  coverHref: string;
  href: string;
  categories: CategoryModel[];
  hasPermission: boolean;
  className?: string;
  isPdf: boolean;
  unlockHref: string;
}

export const FeaturedArticle: React.FC<Props> = ({
  hasPermission,
  categories,
  title,
  className,
  coverHref,
  author,
  href,
  isPdf,
  unlockHref,
  ...rest
}) => {
  const containerClass = classNames("w-full h-full");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const imageClass = classNames(
    "top-0 left-0 w-full h-full object-cover",
    {
      'opacity-100': hasPermission,
      'opacity-40': !hasPermission,
    }
  );
  const contentClass = classNames("w-full h-full flex flex-col justify-between p-2 gap-2");
  const textareaClass = classNames("h-full flex flex-col gap-2");
  const categoriesClass = classNames("flex flex-wrap gap-1");
  const authorClass = classNames("text-xs text-gray-dark");
  const titleClass = classNames(
    "line-clamp-3 font-display",
    {
      'text-black': hasPermission,
      'text-gray-dark': !hasPermission,
    }
  );

  return (
    <BaseCardContainer className={`base-container-axis-article ${className}`} href={hasPermission ? href : null} {...rest}>
      <div className={`${!isPdf && 'grid-axis-control-content-article'} ${containerClass}`}>
        {!isPdf &&
          <div className={`image-control-article ${containerImageClass}`}>
            <Image
              fill
              src={coverHref}
              alt={title}
              className={imageClass}
            />
          </div>
        }
        <div className={contentClass}>
          <div className={textareaClass}>
            <div className={`text-content-position-article w-full h-full flex flex-col justify-center gap-1`}>
              <div className={categoriesClass}>
                {categories?.map((category, index) => (
                  <Tag key={index} text={category.label} variant={hasPermission ? 'primary' : 'disabled'}></Tag>
                ))}
              </div>
              <p className={`dynamic-text-article ${titleClass}`}>{title}</p>
            </div>
            <p className={`author-margin-article ${authorClass} ${hasPermission && 'mb-3'}`}>{author}</p>
          </div>
          {!hasPermission &&
            <div className="group flex justify-end items-center gap-1.5 text-primary-400">
              <UnlockIcon className="w-3 mb-1 group-hover:animate-bounce" />
              <Link text="Desbloquear" href={unlockHref} />
            </div>
          }
        </div>
      </div>
    </BaseCardContainer>
  );
};