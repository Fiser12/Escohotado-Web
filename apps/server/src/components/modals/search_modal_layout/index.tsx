"use client";

import React, { useState, useEffect } from 'react';
import { CategoryModel } from 'hegel';
import { SearchIcon } from '@payloadcms/ui';
import { AllIcon, ChevronDownIcon, LockIcon, ArticleIcon, BookIcon, QuoteIcon, VideoIcon } from "@/components/assets/icons";

export interface SearchedItem {
  id: number;
  href?: string | null;
  icon: React.ReactNode;
  title: string;
  tags: CategoryModel[];
}
export type SearchOptions = "all" | "article" | "book" | "video" | "quote";

interface Props {
  initialSearchTerm?: string | null;
  secondsDelay: number;
  onType: (value: string) => void;
  onTagClick: (tag: CategoryModel) => void;
  items: SearchedItem[];
  subscriptionHref: string;
  maxItemSize: number;
  children?: React.ReactNode;
  onFilterChange?: (filter: SearchOptions) => void;
  initialFilter?: SearchOptions;

}
const getFilterIcon = (option: SearchOptions) => {
  switch (option) {
    case "all":
      return (
        <AllIcon />
      );
    case "article":
      return <ArticleIcon />;
    case "book":
      return <BookIcon />;
    case "video":
      return <VideoIcon />;
    case "quote":
      return <QuoteIcon />;
    default:
      return null;
  }
};

const getFilterLabel = (option: SearchOptions) => {
  switch (option) {
    case "all":
      return "Todos";
    case "article":
      return "Artículo";
    case "book":
      return "Libros";
    case "video":
      return "Videos";
    case "quote":
      return "Citas";
    default:
      return "";
  }
};

export const SearchModal: React.FC<Props> = ({
  initialSearchTerm,
  secondsDelay,
  onType,
  items,
  subscriptionHref,
  maxItemSize,
  children,
  onFilterChange,
  initialFilter = "all"
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");
  const [filter, setFilter] = useState<SearchOptions>(initialFilter);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleFilterChange = (value: SearchOptions) => {
    setFilter(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const options: SearchOptions[] = ["all", "article", "book", "video", "quote"];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onType(searchTerm);
    }, secondsDelay * 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, secondsDelay, onType]);
  const className = "flex justify-start items-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white shadow-md rounded-lg px-3 py-2">
        <div className="flex items-center bg-gray-200 rounded-md">
          <div className="pl-2">
            <SearchIcon />
          </div>
          <input
            className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
            id="search"
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative ml-2">
            <button
              onClick={toggleDropdown}
              className="flex items-center bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2 rounded-md"
            >
              <div className="h-6 w-6 mr-1">{getFilterIcon(filter)}</div>
              <span className="ml-1 text-primary-900 text-xs font-body">{getFilterLabel(filter)}</span>
              <ChevronDownIcon />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-full bg-white shadow-lg rounded-md z-10">
                {options.map((option) => (
                  <button
                    key={option}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-200"
                    onClick={() => {
                      handleFilterChange(option);
                      setDropdownOpen(false);
                    }}
                  >
                    <div className='h-6 w-6'>{getFilterIcon(option)}</div>
                    <span className="ml-2 text-primary-900 text-xs font-body">{getFilterLabel(option)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {items.length !== 0 && <div
          className="py-3 text-sm"
          style={{ maxHeight: `${maxItemSize}px`, overflowY: 'auto' }}
        >
          {items.map((item, index) => {
            const Content = <>
              <div className="flex-none h-6 w-6">
                {item.icon}
              </div>
              <div className="ml-3 flex-grow font-medium line-clamp-2">{item.title}</div>
              <div className="flex items-center space-x-2">
                {item.href == null && <div className='h-5 w-5'><LockIcon /> </div>}
              </div>
            </>
            return <a href={item.href ?? subscriptionHref} key={index} className={className}>{Content}</a>
          })}
          {children}
        </div>
        }
      </div>
    </div>
  );
};

