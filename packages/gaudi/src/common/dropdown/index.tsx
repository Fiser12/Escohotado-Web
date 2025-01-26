"use client";
import { useState } from "react";
import { MenuSection } from "hegel";
import { BasicMenu } from "../menu";
import classNames from "classnames";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    menuSections: MenuSection[]
    icon?: React.ReactNode;
}

export const BasicDropdown: React.FC<Props> = ({text, menuSections, icon, className, ...rest}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu(changeTo?: boolean) {
        setIsMenuOpen(changeTo ?? !isMenuOpen);
    }
    const divClass = classNames(
        className,
        "relative inline-block"
    )

    return (
        <div className={divClass} {...rest}>
            <button
                onMouseEnter={() => toggleMenu(true)}
                onFocus={() => toggleMenu(true)}
            >
                <div className="flex items-center gap-1.5 h-16">
                    {icon}
                    <span className="font-semibold font-body text-sm">{text}</span>
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5359 5L0.0717969 -6.05683e-07L7 0L3.5359 5Z" fill="#222222" />
                    </svg>
                </div>
            </button>
            {isMenuOpen && <div className="absolute left-0 z-10">
                <BasicMenu toggleMenu={toggleMenu} menuSections={menuSections} />
            </div>}
        </div>
    );

};
