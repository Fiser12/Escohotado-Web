import classNames from "classnames";
import { useRef, useState, useEffect } from "react";
import { Tag } from "../../../common/tag/tag";
import { H4 } from "../../../common/headers/H4";
import Image from "next/image";

interface Props {
  title: string;
  coverHref: string;
  href: string;
  categories: {
    id: string;
    singular_name: string;
    seed?: string | null;
  }[];
  className?: string;
}

export const FeaturedVideo = (props: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setIsVertical(width <= 300);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const containerClass = classNames(
    props.className,
    "w-full h-full min-h-[200px] max-h-[400px] grid gap-2 bg-white p-1 rounded");

  const imageClass = classNames(
    "w-full h-full object-cover"
  );

  const contentClass = classNames("flex flex-col justify-between p-2 gap-2");

  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");

  const categoriesClass = classNames("flex flex-wrap gap-1");

  return (
    <div className={containerClass} ref={containerRef}>
      <div className="relative w-full h-[240px] rounded overflow-hidden">
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
            <path fill-rule="evenodd" clip-rule="evenodd" d="M35 70.3707C54.33 70.3707 70 54.7006 70 35.3706C70 16.0406 54.33 0.370605 35 0.370605C15.67 0.370605 -3.05176e-05 16.0406 -3.05176e-05 35.3706C-3.05176e-05 54.7006 15.67 70.3707 35 70.3707ZM51.2063 37.053C52.431 36.2657 52.431 34.4755 51.2063 33.6882L29.223 19.5569C27.892 18.7012 26.1415 19.6569 26.1415 21.2392V49.502C26.1415 51.0843 27.892 52.04 29.223 51.1844L51.2063 37.053Z" fill="currentColor" />
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
          <div className="pb-4">
            <H4 label={props.title} className="line-clamp-3" />
          </div>
        </div>
      </div>
    </div>
  );
};