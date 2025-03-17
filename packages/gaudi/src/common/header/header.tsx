import { type MenuSection, type UserModel, type Optional, routes, navItemList, MenuItem } from 'hegel';
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
            {...rest}
            className="hidden lg:block"
            user={user}
            signIn={signIn}
            accountMenuItems={menuSections}
            pageItems={navItemList(hasPermission)}
            logoutMenuItem={logoutMenuItem}
        />
        <HeaderMobile
            {...rest}
            className="block lg:hidden"
            user={user}
            signIn={signIn}
            accountMenuItems={menuSections}
            pageItems={navItemList(hasPermission)}
            logoutMenuItem={logoutMenuItem}
        />
    </>)
}
