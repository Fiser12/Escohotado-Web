"use client";
import { MenuSection, UserModel } from "hegel";
import React from "react"
import { useState } from "react"

type Args = {
    user: UserModel
    toggleMenu: (changeTo?: boolean) => void
    menuSectionsLoader: (user: UserModel) => [MenuSection]
}
export const HeaderSubmenu = ({
    user,
    toggleMenu,
    menuSectionsLoader
}: Args): JSX.Element => {
    const [menuSections] = useState<MenuSection[]>(menuSectionsLoader(user));

    return (
        <div
            className="w-40 bg-white rounded-sm flex-col justify-start items-start inline-flex"
            onMouseLeave={() => toggleMenu(false)}
            role="menu"
            tabIndex={7}
        >
            {menuSections.map((section, i) => (
                <React.Fragment key={i}>
                    {section.title && (
                        <div className="text-menu-section-title text-xs px-5 py-2.5 font-bold font-montserrat leading-3">
                            {section.title}
                        </div>
                    )}

                    {section.items.map((item, j) => {
                        const action = item.action;
                        const href = item.href;

                        return (
                            <div
                                key={j}
                                className="h-8 px-5 py-2.5 flex-col justify-start items-start gap-2.5 flex"
                            >
                                <div className="self-stretch h-3.5 justify-start items-center gap-1 flex">
                                    {action ? (
                                        <button
                                            onClick={action}
                                            className="text-black text-xs font-normal font-montserrat leading-3"
                                        >
                                            {item.text}
                                        </button>
                                    ) : href ? (
                                        <a
                                            href={href}
                                            className="text-black text-xs font-normal font-montserrat leading-3"
                                        >
                                            {item.text}
                                        </a>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}

                    {i < menuSections.length - 1 && (
                        <div className="self-stretch h-px border border-[#dadada]"></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
