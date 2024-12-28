import React, { useRef, useState, useEffect } from "react";
import classNames from "classnames";
import { Tag } from "../../../common/tag/tag";
import { H3 } from "../../../common/headers/H3";
import { Link } from "../../../common/links/link";

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
  className?: string;
}

export const FeaturedArticle = (props: Props) => {
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
    "w-full h-full min-h-[200px] max-h-[400px] grid gap-2 bg-white p-1 rounded",
    {
      "grid-cols-1": isVertical || window.innerWidth < 640,
      "grid-cols-2": !isVertical && window.innerWidth >= 640,
    }
  );

  const imageClass = classNames(
    "w-full h-full max-h-full max-w-full object-cover rounded hidden sm:block"
  );

  const contentClass = classNames("flex flex-col justify-between p-2 gap-2");

  const textareaClass = classNames("h-full flex flex-col justify-center gap-2.5");

  const categoriesClass = classNames("flex flex-wrap gap-1");

  const authorClass = classNames("text-xs text-gray-dark");

  return (
    <div className={containerClass} ref={containerRef}>
      <img
        src={props.coverHref}
        alt={props.title}
        className={imageClass}
      />
      <div className={contentClass}>
        <div className={textareaClass}>
          <div className={categoriesClass}>
            {props.categories?.map((category, index) => (
              <Tag key={index} text={category.singular_name}></Tag>
            ))}
          </div>
          <H3 label={props.title} className="line-clamp-3" />
          <p className={authorClass}>{props.author}</p>
        </div>
        <Link text="Leer más" href={props.href} />
      </div>
    </div>
  );
};
