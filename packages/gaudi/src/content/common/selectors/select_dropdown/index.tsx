"use client";

import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

type Props = {
  title: string;
  multiple?: boolean;
  showSelectionAtLabel: boolean;
  showClearButton?: boolean;
  selectedTags: string[];
  tags: Record<
    string,
    {
      label: string;
      icon?: React.ReactNode;
    }
  >;
  onSelectedTagsChange: (selectedTags: string[]) => void;
  color: "white" | "primary";
  iconButton?: React.ReactNode;
  className?: string;
};

export const SelectDropdown = (props: Props): JSX.Element => {
  const multiple = props.multiple ?? true;
  const onSelectedTagsChange = props.onSelectedTagsChange;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(props.selectedTags);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagChange = (key: string) => {
    setSelectedTags((prev) =>
      !multiple
        ? [key]
        : prev.includes(key)
        ? prev.filter((tag) => tag !== key)
        : [...prev, key]
    );
    setIsOpen(false);
  };

  useEffect(() => {
    if (process.env.STORYBOOK) return;
    onSelectedTagsChange(selectedTags);
  }, [selectedTags]);

  const buttonClass = classNames(
    "w-full md:w-auto h-[40px] max-w-[300px] rounded px-5 py-2 text-primary-500 font-body text-sm text-center flex items-center gap-2 border-[1.5px]",
    props.className,
    {
      "bg-primary-50 hover:bg-primary-100 focus:ring-1 focus:outline-none focus:ring-primary-200 border-primary-100":
        props.color === "primary",
      "bg-white hover:bg-primary-50 focus:ring-1 focus:outline-none focus:ring-primary-200 border-primary-100":
        props.color === "white",
    }
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const contentButton = classNames(
    "w-full flex items-center justify-between gap-2"
  );

  const menuContainerClass = classNames(
    "z-10 absolute left-0 bg-white rounded shadow-md mt-2 divide-y divide-gray-100 min-w-max max-w-[300px]",
    { hidden: !isOpen, block: isOpen }
  );

  const selectedTag = selectedTags[0] ? props.tags[selectedTags[0]] : null;
  const showCustomTitle =
    props.showSelectionAtLabel && !multiple && selectedTags.length === 1;

  return (
    <div ref={dropdownRef} className="relative w-auto">
      <button onClick={toggleDropdown} className={buttonClass}>
        {(props.iconButton || (showCustomTitle && selectedTag?.icon)) && (
          <span className="text-primary-900">
            {showCustomTitle && selectedTag?.icon
              ? selectedTag.icon
              : props.iconButton}
          </span>
        )}

        <div className={contentButton}>
          {showCustomTitle && selectedTag
            ? selectedTag?.label
            : props.title}
          <svg
            width="7"
            height="5"
            viewBox="0 0 7 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.5359 5L0.0717969 -6.05683e-07L7 0L3.5359 5Z" fill="#222222" />
          </svg>
        </div>
      </button>
      <div className={menuContainerClass}>
        <ul
          className="max-h-[150px] overflow-scroll space-y-0.5 text-sm font-body w-full"
          aria-labelledby="dropdownBgHoverButton"
        >
          {Object.entries(props.tags).map(([key, { label, icon }]) => (
            <li key={key}>
              <div
                className={classNames(
                  "flex items-center gap-1 h-10 py-4 pl-4 pr-5 hover:bg-gray-100",
                  { "bg-gray-100": selectedTags.includes(key) }
                )}
              >
                {icon && <span className="text-primary-900">{icon}</span>}
                <div className="w-full flex justify-between items-center gap-2">
                  <label
                    htmlFor={`item-${key}`}
                    className="w-full ms-2 text-sm font-medium text-black rounded"
                  >
                    {label}
                  </label>
                  <input
                    id={`item-${key}`}
                    type={multiple ? "checkbox" : "radio"}
                    value={key}
                    checked={selectedTags.includes(key)}
                    onChange={() => handleTagChange(key)}
                    className="w-4 h-4 accent-primary-400 bg-gray-100 border-gray-300 rounded focus:ring-primary-300 focus:ring-1"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {(props.showClearButton ?? true) && (
          <button
            className="w-full px-6 py-4 hover:bg-gray-100 text-sm text-left text-gray-700"
            onClick={() => {
              setSelectedTags([]);
              setIsOpen(false);
            }}
          >
            Ver todos
          </button>
        )}
      </div>
    </div>
  );
};
