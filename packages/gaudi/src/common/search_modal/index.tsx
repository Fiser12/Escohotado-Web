"use client";

import React, { useState, useEffect } from 'react';
import { Tag } from '../tag/tag';
import { CategoryModel } from 'hegel';
import { SearchIcon } from '../icons/search_icon';

export interface SearchedItem {
  id: string;
  href: string;
  icon: React.ReactNode;
  title: string;
  tags: CategoryModel[];
}

interface Props {
  initialSearchTerm?: string | null;
  secondsDelay: number;
  onType: (value: string) => void;
  onTagClick: (tag: CategoryModel) => void;
  items: SearchedItem[];
  maxItemSize: number;
}

export const SearchModal: React.FC<Props> = ({
  initialSearchTerm,
  secondsDelay,
  onType,
  items,
  onTagClick,
  maxItemSize,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onType(searchTerm);
    }, secondsDelay * 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white shadow-md rounded-lg px-3 py-2">
          <div className="flex items-center bg-gray-200 rounded-md">
            <div className="pl-2">
              <SearchIcon />
            </div>
            <input
              className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
              id="search"
              type="text"
              placeholder="Buscar contenido"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        { items.length !== 0 && <div
            className="py-3 text-sm"
            style={{ maxHeight: `${maxItemSize}px`, overflowY: 'auto' }}
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
              >
                {item.icon}
                <div className="flex-grow font-medium px-2">{item.title}</div>
                <div className="flex items-center space-x-2">
                  {item.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      text={tag.label}
                      variant="primary"
                      onClick={() => onTagClick(tag)}
                    />
                  ))}
                </div>
              </a>
            ))}
          </div> }
        </div>
      </div>
  );
};
