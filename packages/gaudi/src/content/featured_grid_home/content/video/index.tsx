"use client";

import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import Image from "next/image";
import { Link } from "../../../../common/links/link";
import { LockIcon } from "../../../../common/icons/lock_icon";
import { PlayIcon } from "../../../../common/icons/play_icon";
import { BaseCardContainer } from "../../container_base";
import { UnlockIcon } from "../../../../common/icons/unlock_icon";
import "./style.css"

interface Props {
  title: string;
  coverHref: string;
  href: string;
  publishedAt?: string | null;
  categories?: {
    id: string;
    singular_name: string;
    seed?: string | null;
  }[];
  hasPermission: boolean;
  className?: string;
}

export const FeaturedVideo = (props: Props) => {

  const containerClass = classNames("w-full h-full min-h-[300px] gap-1");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const imageClass = classNames(
    "w-full h-full object-cover",
    {
      'opacity-100': props.hasPermission,
      'opacity-40': !props.hasPermission,
    }
  );
  const contentClass = classNames(
    "flex flex-col justify-between px-2 py-4 gap-2"
  );
  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");
  const titleClass = classNames(
    "line-clamp-3 font-body",
    {
      'text-black': props.hasPermission,
      'text-gray-dark': !props.hasPermission,
    }
  );
  const categoriesClass = classNames("flex flex-wrap gap-1");

  const date = props.publishedAt ? new Date(props.publishedAt) : null;
  const formattedDate = date?.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <BaseCardContainer className={`base-container-axis-video ${props.className}`}>
      <div className={`grid-axis-control-content-video ${containerClass}`}>
        <div className={`image-container-video ${containerImageClass}`}>
          <Image
            width={1280}
            height={720}
            src={props.coverHref}
            alt={props.title}
            className={imageClass}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-dark hover:text-primary-400 rounded-[100px] bg-white w-[50px] h-[50px] flex items-center justify-center shadow-xl">
            {props.hasPermission ? <PlayIcon className="p-4 translate-x-[2px]" /> : <LockIcon className={`icon-animation p-3`} />}
          </div>
        </div>
        <div className={contentClass}>
          <div className={`text-content-position-video ${textareaClass}`}>
            {props.categories && props.categories.length > 0 && (
              <div className={categoriesClass}>
                {props.categories.map((category) => (
                  <Tag
                    key={category.id}
                    text={category.singular_name}
                    variant={props.hasPermission ? 'primary' : 'disabled'}
                  />
                ))}
              </div>
            )}
            <p className={`dynamic-text-video ${titleClass}`}>{props.title}</p>
            <p className="font-body text-xs text-gray-dark mt-1">{formattedDate}</p>
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