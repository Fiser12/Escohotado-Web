"use client";

import { MenuItem, MenuSection, UserModel } from "hegel";
import { Hamburguer } from "./hamburguer";
import { Logo } from "./logo";
import { MobileMenu } from "./user_dropdown/mobile_menu";
import { useState } from "react";
import { ContentWrapper } from "../content_wrapper/content_wrapper";
import { OpenModalButton } from "./open_search_modal_button";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: UserModel | null
    accountMenuItems: MenuSection[]
    pageItems: MenuItem[]
    logoutMenuItem: MenuItem
    signIn: () => Promise<void>
}

export const HeaderMobile: React.FC<Props> = ({ user, accountMenuItems, className, pageItems, logoutMenuItem, signIn, ...rest }) => {
    const [isOpenMenu, setIsMenuOpen] = useState(false)

    return <header {...rest} className="w-full bg-white block lg:hidden">
        <ContentWrapper>
            <nav className="flex justify-between items-center lg:hidden h-16 py-5">
                <Logo tabIndex={0} />
                <div className="flex gap-4 lg:hidden">
                    <OpenModalButton />
                    <div className="flex items-center gap-4" onClick={() => setIsMenuOpen(!isOpenMenu)}>
                        <Hamburguer />
                    </div>
                </div>
            </nav>
            <div className={`absolute w-full left-0 bg-white transform transition-transform ${isOpenMenu ? "block" : "hidden"} lg:hidden`}>
                <MobileMenu
                    user={user}
                    signIn={signIn}
                    accountMenuItems={accountMenuItems}
                    pageItems={pageItems}
                    logoutMenuItem={logoutMenuItem}
                />
            </div>
        </ContentWrapper>
    </header>
}