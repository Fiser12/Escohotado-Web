import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { Logo } from "./logo"
import { type MenuSection, type UserModel, type Optional, routes, navItemList } from 'hegel';
import { NavItem } from "./nav_item";
import { UserDropdown } from "./user_dropdown";
import { MainButton } from "../main_button/main_button";
import { OpenModalButton } from "./open_search_modal_button";
import { ArrowLinkIcon } from "../icons/arrow_link";
import { HeaderMobile } from "./header_mobile";

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
    return (
        <>
        <header {...rest} className="w-full bg-white hidden lg:block">
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
                            <button className="cursor-pointer" type="submit" tabIndex={7} onClick={signIn}>
                                <NavItem>
                                    <p>Iniciar sesión</p>
                                    <ArrowLinkIcon />
                                </NavItem>
                            </button>
                        }
                    </div>
                </nav>
            </ContentWrapper>
        </header>
        <HeaderMobile
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
        </>
    )
}


