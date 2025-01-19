"use client";

import classNames from "classnames";
import { Tag } from "../../../../common/tag/tag";
import { H4 } from "../../../../common/headers/H4";
import Image from "next/image";
import { Link } from "../../../../common/links/link";
import { LockIcon } from "../../../../common/icons/lock_icon";
import { BaseCardContainer } from "../../container_base";

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

  const containerClass = classNames(
    "w-full h-full min-h-[300px]");

  const containerImageClass = classNames(
    "w-full rounded overflow-hidden relative"
  );

  const imageClass = classNames(
    "top-0 left-0 w-full h-full object-cover",
    {
      'opacity-100': props.hasPermission,
      'opacity-40': !props.hasPermission,
    }
  );

  const contentClass = classNames("flex flex-col justify-between p-2 gap-2");

  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");

  const categoriesClass = classNames("flex flex-wrap gap-1");

  return (
    <>
      <style>
        {`
        .base-container-axis-video {
          container-type: inline-size;
        }
        .grid-axis-control-content-video {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
        }
        @container (min-width: 650px) {
          .grid-axis-control-content-video {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
      `}
      </style>
      <BaseCardContainer className={`base-container-axis-video ${props.className}`}>
        <div className={`grid-axis-control-content-video ${containerClass}`}>
          <div className={containerImageClass}>
            <Image
              fill
              src={props.coverHref}
              alt={props.title}
              className={imageClass}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white hover:text-primary-100 ">
              <svg
                className="w-[70px] h-[71px] drop-shadow-2xl"
                viewBox="0 0 70 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M35 70.3707C54.33 70.3707 70 54.7006 70 35.3706C70 16.0406 54.33 0.370605 35 0.370605C15.67 0.370605 -3.05176e-05 16.0406 -3.05176e-05 35.3706C-3.05176e-05 54.7006 15.67 70.3707 35 70.3707ZM51.2063 37.053C52.431 36.2657 52.431 34.4755 51.2063 33.6882L29.223 19.5569C27.892 18.7012 26.1415 19.6569 26.1415 21.2392V49.502C26.1415 51.0843 27.892 52.04 29.223 51.1844L51.2063 37.053Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className={contentClass}>
            <div className={textareaClass}>
              <div className={categoriesClass}>
                {props.categories?.map((category, index) => (
                  <Tag key={index} text={category.singular_name}></Tag>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <H4 label={props.title} className="line-clamp-3" />
                {!props.hasPermission &&
                  <div className="flex justify-end items-center gap-1 text-primary-400 pt-4">
                    <LockIcon className="w-4 mb-0.5" />
                    <Link text="Desbloquear" href={props.href} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </BaseCardContainer>
    </>
  );
};