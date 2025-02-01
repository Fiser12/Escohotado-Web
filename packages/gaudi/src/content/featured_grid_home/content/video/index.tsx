import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import Image from "next/image";
import { Link } from "../../../../common/links/link";
import { LockIcon } from "../../../../common/icons/lock_icon";
import { PlayIcon } from "../../../../common/icons/play_icon";
import { BaseCardContainer } from "../../container_base";
import { UnlockIcon } from "../../../../common/icons/unlock_icon";
import "./style.css"
import { CategoryModel } from "hegel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  coverHref: string;
  href: string;
  detailHref: string;
  publishedAt?: string | null;
  categories?: CategoryModel[];
  unlockHref: string;
  hasPermission: boolean;
  className?: string;
}

export const FeaturedVideo: React.FC<Props> = ({hasPermission, publishedAt, className, detailHref, coverHref, title, categories, unlockHref, ...rest}) => {

  const containerClass = classNames("w-full h-full min-h-[300px] gap-1");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const imageClass = classNames(
    "w-full h-full object-cover",
    {
      'opacity-100': hasPermission,
      'opacity-40': !hasPermission,
    }
  );
  const contentClass = classNames(
    "flex flex-col justify-between px-2 py-4 gap-2"
  );
  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");
  const titleClass = classNames(
    "line-clamp-3 font-body",
    {
      'text-black': hasPermission,
      'text-gray-dark': !hasPermission,
    }
  );
  const categoriesClass = classNames("flex flex-wrap gap-1");

  const date = publishedAt ? new Date(publishedAt) : null;
  const formattedDate = date?.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <BaseCardContainer className={`base-container-axis-video ${className}`} {...rest} href={hasPermission ? detailHref : null}>
      <div className={`grid-axis-control-content-video ${containerClass}`}>
        <div className={`image-container-video ${containerImageClass}`}>
          <Image
            width={1280}
            height={720}
            src={coverHref}
            alt={title}
            className={imageClass}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-dark hover:text-primary-400 rounded-full bg-white w-[50px] h-[50px] items-center justify-center shadow-xl">
            {hasPermission ? <PlayIcon className="p-4 translate-x-[2px]" /> : <LockIcon className={`icon-animation p-3`} />}
          </div>
        </div>
        <div className={contentClass}>
          <div className={`text-content-position-video ${textareaClass}`}>
            {categories && categories.length > 0 && (
              <div className={categoriesClass}>
                {categories.map((category, index) => (
                  <Tag
                    key={index}
                    text={category.label}
                    variant={hasPermission ? 'primary' : 'disabled'}
                  />
                ))}
              </div>
            )}
            <p className={`dynamic-text-video ${titleClass}`}>{title}</p>
            <p className="font-body text-xs text-gray-dark mt-1">{formattedDate}</p>
          </div>
          {!hasPermission &&
            <div className="group flex justify-end items-center gap-1.5 text-primary-400 pt-4">
              <UnlockIcon className="w-3 mb-1 group-hover:animate-bounce" />
              <Link text="Desbloquear" href={unlockHref} />
            </div>
          }
        </div>
      </div>
    </BaseCardContainer>
  );
};