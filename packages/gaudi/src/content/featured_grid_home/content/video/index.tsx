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
  categories: {
    id: string;
    singular_name: string;
    seed?: string | null;
  }[];
  hasPermission: boolean;
  className?: string;
}

export const FeaturedVideo = (props: Props) => {

  const containerClass = classNames("w-full h-full min-h-[300px]");
  const containerImageClass = classNames("w-full rounded overflow-hidden relative");
  const imageClass = classNames(
    "w-full h-full object-cover",
    {
      'opacity-100': props.hasPermission,
      'opacity-40': !props.hasPermission,
    }
  );
  const contentClass = classNames(
    "flex flex-col justify-between p-2 gap-2",
    {
      'pb-2': props.hasPermission,
      'pb-1': !props.hasPermission,
    }
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

  return (
    <BaseCardContainer className={`base-container-axis-video ${props.className}`}>
      <div className={`grid-axis-control-content-video ${containerClass}`}>
        <div className={containerImageClass}>
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
          <div className={`text-content-position-article ${textareaClass}`}>
            <div className={categoriesClass}>
              {props.categories?.map((category, index) => (
                <Tag key={index} text={category.singular_name} variant={props.hasPermission ? 'primary' : 'disabled'}></Tag>
              ))}
            </div>
            <p className={`dynamic-text-video ${titleClass}`}>{props.title}</p>
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