import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { Logo } from "./logo"
import { type MenuSection, type UserModel, type Optional, routes, MenuItem } from 'hegel';
import { NavItem } from "./nav_item";
import { UserDropdown } from "./user_dropdown";
import { MainButton } from "../main_button/main_button";
import { OpenModalButton } from "./open_search_modal_button";
import { ArrowLinkIcon } from "../icons/arrow_link";
import { useState } from "react";
import { Hamburguer } from "./hamburguer";
import { MobileMenu } from "./user_dropdown/mobile_menu";

const navItemList: (hasPermission: Boolean) => MenuItem[] = (hasPermission) => {
    let items = [
        { href: routes.nextJS.lecturasPageHref, tabindex: 2, text: "Lecturas" },
        { href: routes.nextJS.videosPageHref, tabindex: 3, text: "Videos" },
        { href: routes.nodeBB.root, tabindex: 4, text: "Foro" },
    ]
    if (hasPermission) {
        items.push({
            href: routes.nextJS.citasPageHref,
            tabindex: 5,
            text: "Citas"
        })
    }
    return items
}

export interface Props extends React.HTMLAttributes<HTMLElement> {
    user: Optional<UserModel>
    hasPermission: boolean
    menuSections: MenuSection[]
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}

export const Header: React.FC<Props> = ({
    user,
    signIn,
    signOut,
    menuSections,
    hasPermission,
    ...rest
}) => {
    const [isOpenMenu, setIsMenuOpen] = useState(false)

    return (
        <header {...rest} className="w-full bg-white">
            <ContentWrapper>
                <nav className="relative h-16 py-5 bg-white flex justify-between items-center">
                    <Logo tabIndex={0} />
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        {navItemList(hasPermission).map(item => (
                            <NavItem href={item.href} tabindex={item.tabindex}>{item.text}</NavItem>
                        ))}
                    </div>
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        <div className="flex items-center gap-4">
                            <OpenModalButton />
                            <a href={routes.otherExternal.emboscadura} target="_blank" tabIndex={6}>
                                <MainButton text="La Emboscadura" color="primary" />
                            </a>
                        </div>
                        {user ? <UserDropdown
                            user={user}
                            menuSections={[
                                ...menuSections,
                                {
                                    items: [{
                                        text: "Cerrar sesión",
                                        action: signOut,
                                        target: "_black",
                                        href: routes.keycloak.logout
                                    }]
                                }
                            ]}
                        /> :
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
                    </div>
                    <div className="flex gap-4 lg:hidden">
                        <OpenModalButton />
                        <div className="flex items-center gap-4" onClick={() => setIsMenuOpen(!isOpenMenu)}>
                            <Hamburguer />
                        </div>
                    </div>
                </nav>
                <div id="mobileMenu" className={`absolute  w-full left-0 bg-white transform transition-transform ${isOpenMenu ? "opacity-100" : "opacity-0"} lg:opacity-0`}>
                    <MobileMenu
                        user={user}
                        signIn={signIn}
                        accountMenuItems={menuSections}
                        pageItems={navItemList(hasPermission)}
                        logoutMenuItem={{
                            text: "Cerrar sesión",
                            action: signOut,
                            target: "_black",
                            href: routes.keycloak.logout
                        }}
                    />
                </div>
            </ContentWrapper>
        </header>
    )
}

