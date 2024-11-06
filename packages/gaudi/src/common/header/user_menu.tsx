"use client";
import { useState } from "react";
import { HeaderSubmenu } from "./header_submenu";
import { MenuSection, UserModel } from "hegel";
import { MainButton } from "../main_button/main_button";
import { UserIcon } from '../icons/UserIcon';

export type Args = {
    user: UserModel
    menuSections: MenuSection[]
}

export const UserMenu = ({ user, menuSections }: Args): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu(changeTo?: boolean) {
        setIsMenuOpen(changeTo ?? !isMenuOpen);
    }

    return (
        <div className="relative inline-block">
            <button
                onMouseEnter={() => toggleMenu(true)}
                onFocus={() => toggleMenu(true)}
            >
                <MainButton text={`Hola, ${user.name ?? user.email}`} type="line" icon={<UserIcon height='14' color='primary' />} classname="focus:outline-none" />
            </button>
            {isMenuOpen && <div className="absolute left-0 z-10">
                <HeaderSubmenu toggleMenu={toggleMenu} menuSections={menuSections} />
            </div>}
        </div>
    );

};
