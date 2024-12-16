"use client";
import { MenuSection } from "hegel";
import React from "react"
import { useState } from "react"

type Args = {
    toggleMenu: (changeTo?: boolean) => void
    menuSections: MenuSection[]
}
export const BasicMenu = ({
    toggleMenu,
    menuSections
}: Args): JSX.Element => {

    return (
        <div
            className="w-full md:w-40 bg-white rounded-sm flex-col justify-start items-start inline-flex shadow-lg"
            onMouseLeave={() => toggleMenu(false)}
            role="menu"
            tabIndex={7}
        >
            {menuSections.map((section, i) => (
                <React.Fragment key={i}>
                    {section.title && (
                        <div className="text-menu-section-title text-xs px-5 py-3 font-semibold font-body leading-3 text-gray-dark">
                            {section.title}
                        </div>
                    )}

                    {section.items.map((item, j) => {
                        const action = item.action;
                        const href = item.href;

                        return (
                            <div
                                key={j}
                                className="w-full px-5 py-3 flex flex-col justify-start items-center gap-2.5 hover:bg-gray-light active:bg-primary-50 focus:bg-primary-50"
                            >
                                <div className="flex self-stretch h-3.5 justify-start items-center gap-1">
                                    {action ? (
                                        <button
                                            onClick={action}
                                            className="text-primary-900 text-xs font-normal font-body leading-3"
                                        >
                                            {item.text}
                                        </button>
                                    ) : href ? (
                                        <a
                                            href={href}
                                            className="text-primary-900 text-xs font-normal font-body leading-3"
                                        >
                                            {item.text}
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}

                    {i < menuSections.length - 1 && (
                        <div className="self-stretch h-px border border-gray-light"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
