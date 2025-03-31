import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import Image from "next/image";
import { Link } from "../../../../common/links/link";
import { BaseCardContainer } from "..";
import { CategoryModel } from "hegel";
import { PlayIcon, LockIcon, UnlockIcon } from "@/components/assets/icons";
import "./style.css"

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

export const VideoCard: React.FC<Props> = ({ hasPermission, publishedAt, className, detailHref, coverHref, title, categories, unlockHref, ...rest }) => {

  const containerClass = classNames("w-full min-h-[300px] h-full gap-1");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const imageClass = classNames(
    "w-full h-full object-cover",
    {
      'opacity-100': hasPermission,
      'opacity-40': !hasPermission,
    }
  );
  const contentClass = classNames(
    "h-full flex flex-col justify-between px-2 py-4 gap-2"
  );
  const textareaClass = classNames("h-full flex flex-col gap-2.5");
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
          <div className="group absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-dark hover:text-primary-400 rounded-full bg-white w-[50px] h-[50px] flex items-center justify-center shadow-xl cursor-pointer transition duration-200 hover:scale-110 motion-reduce:hover:transform-none">
            {hasPermission ? <PlayIcon className="translate-x-[2px] w-[18px] pt-[2px] transition duration-400 ease-in-out group-hover:scale-75  " /> : <LockIcon className={`icon-animation p-3`} />}
          </div>
        </div>
        <div className={contentClass}>
          <div className={textareaClass}>
            <div className={`h-full flex flex-col gap-2 title-section-position-video`}>
              <p className={`dynamic-text-video ${titleClass}`}>{title}</p>
              {categories && categories.length > 0 && (
                <div className={categoriesClass}>
                  {categories.map((category, index) => (
                    <Tag
                      key={index}
                      text={category.label}
                      variant={hasPermission ? 'primary' : undefined}
                      isActive={hasPermission}
                    />
                  ))}
                </div>
              )}
            </div>
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