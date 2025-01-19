import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { H3 } from "../../../../common/headers/H3";
import { Link } from "../../../../common/links/link";
import Image from "next/image";
import { BaseCardContainer } from "../../container_base";
import { LockIcon } from "../../../../common/icons/lock_icon";
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
    {
      'text-black': props.hasPermission,
      'text-gray-dark border-solid': !props.hasPermission,
    }
  );

  return (
    <BaseCardContainer className={`base-container-axis-article ${props.className}`}>
      <div className={`grid-axis-control-content-article ${containerClass}`}>
        <div className={`image-control-article ${containerImageClass}`}>
          <Image
            fill
            src={props.coverHref}
            alt={props.title}
            className={imageClass}
          />
        </div>
        <div className={contentClass}>
          <div className={`text-content-position-article ${textareaClass}`}>
            <div className={categoriesClass}>
              {props.categories?.map((category, index) => (
                <Tag key={index} text={category.singular_name} variant={props.hasPermission ? 'primary' : 'disabled'}></Tag>
              ))}
            </div>
            <H3 label={props.title} className={`${titleClass} line-clamp-3`} />
            <p className={authorClass}>{props.author}</p>
          </div>
          <div className={`flex justify-end gap-1 text-primary-400 pt-4`}>
            {!props.hasPermission && <LockIcon className="w-4 mb-0.5" />}
            <Link text={props.hasPermission ? 'Leer más' : 'Desbloquear'} href={props.href} />
          </div>
        </div>
      </div>
    </BaseCardContainer>
  );
};