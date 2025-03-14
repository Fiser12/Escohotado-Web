"use client";
import { MenuItem, MenuSection, routes, UserModel } from "hegel";
import { UserIcon } from '../../icons/user_icon';
import classNames from "classnames";
import { NavItem } from "../nav_item";
import { MainButton } from "../../main_button/main_button";
import { ArrowLinkIcon } from "../../icons/arrow_link";

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
        "w-full"
    )

    const genericClass = "w-full px-6 py-4 hover:bg-primary-50"
    const genericPYSectionClass = "my-2"

    return (
        <div className={mainContainerClass}>
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
            <div className={genericPYSectionClass}>
                {pageItems.map(item => (
                    <NavItem href={item.href} tabindex={item.tabindex} className={`${genericClass}`}>{item.text}</NavItem>
                ))}
            </div>
            <a href={routes.otherExternal.emboscadura} target="_blank" tabIndex={6}>
                <div className="py-6 flex item-center justify-center bg-red-300">
                    <MainButton text="La Emboscadura" color="primary" />
                </div>
            </a>
            {user &&
                <NavItem href={logoutMenuItem.href} tabindex={logoutMenuItem.tabindex} className={`${genericClass} border-t border-gray-disabled`}>{logoutMenuItem.text}</NavItem>}
        </div>
    );

};