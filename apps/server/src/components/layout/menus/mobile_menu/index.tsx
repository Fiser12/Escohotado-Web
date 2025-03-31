"use client";
import { MenuItem, MenuSection } from "hegel";
import classNames from "classnames";
import { BaseUser } from "payload-access-control";
import { MainButton } from "@/components/atoms/main_button/main_button";
import { HighlightSection } from "@/components/organisms/details/article/highlight/section_highlight";
import { UserIcon, ArrowLinkIcon } from "@/components/assets/icons";
import { NavItem } from "../../header/nav_item";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: BaseUser | null
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
                        {accountMenuItems.map((accountItem, index) => (
                            <div key={index}>
                                {accountItem.items.map((item, index) =>
                                    <NavItem href={item.href} key={index} tabindex={item.tabindex} className={`${genericClass}`}>{item.text}</NavItem>
                                )}
                            </div>
                        ))}
                    </div> :
                    <div className={genericPYSectionClass}>
                        <button className="w-full cursor-pointer" type="submit" tabIndex={7} onClick={signIn}>
                            <NavItem className={`${genericClass} flex justify-between`}>
                                <p>Iniciar sesión</p>
                                <ArrowLinkIcon />
                            </NavItem>
                        </button>
                    </div>
                }
            </div>
            <div className={`${genericPYSectionClass} h-full`}>
                {pageItems.map((item, index) => (
                    <NavItem
                        href={item.href}
                        key={index}
                        tabindex={item.tabindex}
                        className={`${genericClass}`}
                    >
                        {item.text}
                    </NavItem>
                ))}
            </div>
            <a href={"https://laemboscadura.com"} target="_blank" tabIndex={6}>
                <HighlightSection type="secondary">
                    <MainButton text="La Emboscadura" color="primary" />
                </HighlightSection>
            </a>
            {user &&
                <div className={`${genericPYSectionClass}`}>
                    <NavItem
                        href={logoutMenuItem.href!}
                        target={logoutMenuItem.target}
                        onClick={logoutMenuItem.action}
                        className={`${genericClass}`}
                    >
                        {logoutMenuItem.text}
                    </NavItem>

                </div>
            }
        </div>
    );

};