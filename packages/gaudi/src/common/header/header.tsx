import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { Logo } from "./logo"
import { type MenuSection, type UserModel, type Optional, routes, navItemList, MenuItem } from 'hegel';
import { NavItem } from "./nav_item";
import { UserDropdown } from "./user_dropdown";
import { MainButton } from "../main_button/main_button";
import { OpenModalButton } from "./open_search_modal_button";
import { ArrowLinkIcon } from "../icons/arrow_link";
import { HeaderMobile } from "./header_mobile";
import { HeaderDesktop } from "./header_desktop";

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
    const logoutMenuItem: MenuItem = {
        text: "Cerrar sesión",
        action: signOut,
        target: "_black",
        href: routes.keycloak.logout
    }
    return (<>
        <HeaderDesktop
            className="hidden lg:block"
            user={user}
            signIn={signIn}
            accountMenuItems={menuSections}
            pageItems={navItemList(hasPermission)}
            logoutMenuItem={logoutMenuItem}
        />
        <HeaderMobile
            className="block lg:hidden"
            user={user}
            signIn={signIn}
            accountMenuItems={menuSections}
            pageItems={navItemList(hasPermission)}
            logoutMenuItem={logoutMenuItem}
        />
    </>)
}
