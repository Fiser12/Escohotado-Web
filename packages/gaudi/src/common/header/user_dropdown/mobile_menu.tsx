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

    const divClass = classNames(
        className,
        "relative inline-block"
    )

    return (
        <div className={divClass}>
            {user ? <>
                <div className="flex gap-1.5">
                    <UserIcon color='primary' className="h-7" />
                    <p className="font-semibold font-body text-sm">{`Hola, ${user?.name ?? user?.email}`}</p>
                </div>
                {accountMenuItems.map(menuItem => (<div>
                    <p>{menuItem.title}</p>
                    { menuItem.items.map(item =>  <NavItem href={item.href} tabindex={item.tabindex}>{item.text}</NavItem>)}
                    </div>
                ))}
            </> : 
                <button className="cursor-pointer" type="submit" tabIndex={7} onClick={async () => {
                    "use server";
                    await signIn();
                }}>
                    <NavItem>
                        <p>Iniciar sesión</p>
                        <ArrowLinkIcon />
                    </NavItem>
                </button>
            }
            {pageItems.map(item => (
                <NavItem href={item.href} tabindex={item.tabindex}>{item.text}</NavItem>
            ))}
            <a href={routes.otherExternal.emboscadura} target="_blank" tabIndex={6}>
                    <MainButton text="La Emboscadura" color="primary" />
            </a>

            {user &&
             <NavItem href={logoutMenuItem.href} tabindex={logoutMenuItem.tabindex}>{logoutMenuItem.text}</NavItem> }
        </div>
    );

};
