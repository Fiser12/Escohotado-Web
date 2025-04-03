"use client";

import { MobileMenu } from "@/components/layout/menus/mobile_menu";
import { motion } from 'framer-motion';
import { MenuItem, MenuSection } from "hegel";
import { BaseUser } from "payload-access-control";
import { useEffect, useState } from "react";
import { ContentWrapper } from "../content-wrapper";
import { Hamburguer } from "./hamburguer";
import { Logo } from "./logo";
import { OpenModalButton } from "./open_search_modal_button";
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: BaseUser | null
    accountMenuItems: MenuSection[]
    pageItems: MenuItem[]
    logoutMenuItem: MenuItem
    signIn: () => Promise<void>
}

export const HeaderMobile: React.FC<Props> = ({ user, accountMenuItems, className, pageItems, logoutMenuItem, signIn, ...rest }) => {
    const [isOpenMenu, setIsMenuOpen] = useState(false)
    useEffect(() => {
        document.body.style.overflow = isOpenMenu ? 'hidden' : "";
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpenMenu]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                document.body.style.overflow = '';
            } else if (isOpenMenu) {
                document.body.style.overflow = 'hidden';
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpenMenu]);

    return <header {...rest} className={`w-full bg-white ${className ?? ""}`} >
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
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpenMenu ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
                className={`absolute w-full left-0 bg-white z-1000 lg:hidden`}
            >
                <MobileMenu
                    user={user}
                    signIn={signIn}
                    accountMenuItems={accountMenuItems}
                    pageItems={pageItems}
                    logoutMenuItem={logoutMenuItem}
                />
            </motion.div>
        </ContentWrapper>
    </header>
}