import { type MenuSection, type Optional, MenuItem } from 'hegel';
import { HeaderMobile } from "./header_mobile";
import { HeaderDesktop } from "./header_desktop";
import { BaseUser } from 'payload-access-control';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    user: Optional<BaseUser>
    menuSections: MenuSection[]
    pageItems: MenuItem[]
    logoutMenuItem: MenuItem
    signIn: () => Promise<void>
}


export const Header: React.FC<Props> = ({
    user,
    signIn,
    logoutMenuItem,
    pageItems,
    menuSections,
    ...rest
}) => {
    
    
    return (<>
        <HeaderDesktop
            {...rest}
            className="hidden lg:block"
            user={user}
            signIn={signIn}
            accountMenuItems={menuSections}
            pageItems={pageItems}
            logoutMenuItem={logoutMenuItem}
        />
        <HeaderMobile
            {...rest}
            className="block lg:hidden"
            user={user}
            signIn={signIn}
            accountMenuItems={menuSections}
            pageItems={pageItems}
            logoutMenuItem={logoutMenuItem}
        />
    </>)
}
