import { UnlockIcon } from "@/components/assets/icons";
import { Tag } from "@/components/atoms/tag";
import { Link } from "@payloadcms/ui";
import classNames from "classnames";
import { CategoryModel } from "hegel";
import Image from "next/image";
import { BaseCardContainer } from "..";
import "./style.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  author?: string;
  coverHref?: string | null;
  href: string;
  categories: CategoryModel[];
  hasPermission: boolean;
  className?: string;
}

export const ArticleCard: React.FC<Props> = ({
  hasPermission,
  categories,
  title,
  className,
  coverHref,
  author,
  href,
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
  const textareaClass = classNames("h-full flex flex-col gap-4");
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
      <div className={`${coverHref && 'grid-axis-control-content-article'} ${containerClass}`}>
        {coverHref &&
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
            <div className={`text-content-position-article w-full flex flex-col justify-center gap-3`}>
              <p className={`dynamic-text-article ${titleClass}`}>{title}</p>
              <div className={categoriesClass}>
                {categories?.map((category, index) => (
                  <Tag key={index} text={category.label} variant={hasPermission ? 'primary' : undefined} isActive={hasPermission}></Tag>
                ))}
              </div>
            </div>
            <p className={`author-margin-article ${authorClass} ${hasPermission && 'mb-3'}`}>{author}</p>
          </div>
          <div className="h-4 group text-primary-400 flex items-center pt-2">
            {!hasPermission &&
              <div className="w-full flex justify-end items-center gap-1.5">
                <UnlockIcon className="w-3 mb-1 group-hover:animate-bounce" />
                <Link text="Desbloquear" href={href} />
              </div>
            }
          </div>
        </div>
      </div>
    </BaseCardContainer>
  );
};