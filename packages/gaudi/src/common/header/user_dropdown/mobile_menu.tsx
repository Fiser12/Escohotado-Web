"use client";
import { MenuItem, MenuSection, routes, UserModel } from "hegel";
import { UserIcon } from '../../icons/user_icon';
import classNames from "classnames";
import { NavItem } from "../nav_item";
import { MainButton } from "../../main_button/main_button";
import { ArrowLinkIcon } from "../../icons/arrow_link";
import Image from "next/image";
import { HighlightSection } from "../../../client";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: UserModel | null
    accountMenuItems: MenuSection[]
    pageItems: MenuItem[]
    logoutMenuItem: MenuItem
    signIn: () => Promise<void>
}

export const MobileMenu: React.FC<Props> = ({ user, accountMenuItems, className, pageItems, logoutMenuItem, signIn }) => {

    const mainContainerClass = classNames(
        className,
        "w-full flex flex-col"
    )

    // Mirar animación a la hora de ocultar y expandir menu

    const genericClass = "w-full px-6 py-4 hover:bg-primary-50"
    const genericPYSectionClass = "my-2"

    return (
        <div className={`h-[calc(100vh-4rem)] sm:h-auto ${mainContainerClass}`}>
            <div className="border-b border-gray-disabled">
                {user ?
                    <div className={genericPYSectionClass}>
                        <div className={`w-full px-6 py-4 flex items-center gap-2`}>
                            <UserIcon color='primary' className="h-8" />
                            <p className="font-semibold font-body">{`Hola, ${user?.name ?? user?.email}`}</p>
                        </div>
                        {accountMenuItems.map(accountItem => (
                            <div>
                                {accountItem.items.map(item =>
                                    <NavItem href={item.href} tabindex={item.tabindex} className={`${genericClass}`}>{item.text}</NavItem>
                                )}
                            </div>
                        ))}
                    </div> :
                    <div className={genericPYSectionClass}>
                        <button className="w-full cursor-pointer" type="submit" tabIndex={7} onClick={async () => {
                            "use server";
                            await signIn();
                        }}>
                            <NavItem className={`${genericClass} flex justify-between`}>
                                <p>Iniciar sesión</p>
                                <ArrowLinkIcon />
                            </NavItem>
                        </button>
                    </div>
                }
            </div>
            <div className={`${genericPYSectionClass} h-full`}>
                {pageItems.map(item => (
                    <NavItem href={item.href} tabindex={item.tabindex} className={`${genericClass}`}>{item.text}</NavItem>
                ))}
            </div>
            <a href={routes.otherExternal.emboscadura} target="_blank" tabIndex={6}>
                <HighlightSection type="secondary">
                    <MainButton text="La Emboscadura" color="primary" />
                </HighlightSection>
            </a>
            {user &&
                <div className={`${genericPYSectionClass}`}>
                    <NavItem href={logoutMenuItem.href} tabindex={logoutMenuItem.tabindex} className={`${genericClass}`}>{logoutMenuItem.text}</NavItem>
                </div>
            }
        </div>
    );

};