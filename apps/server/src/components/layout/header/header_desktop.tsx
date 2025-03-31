import { MenuItem, MenuSection } from "hegel";
import { Logo } from "./logo";
import { ContentWrapper } from "../../layout/content_wrapper/content_wrapper";
import { OpenModalButton } from "./open_search_modal_button";
import { NavItem } from "./nav_item";
import { BaseUser } from "payload-access-control";
import { ArrowLinkIcon } from "@/components/assets/icons";
import { MainButton } from "@/components/atoms/main_button/main_button";
import { UserDropdown } from "../menus/user_dropdown";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user?: BaseUser | null
    accountMenuItems: MenuSection[]
    pageItems: MenuItem[]
    logoutMenuItem: MenuItem
    signIn: () => Promise<void>
}

export const HeaderDesktop: React.FC<Props> = ({ user, accountMenuItems, className, pageItems, logoutMenuItem, signIn, ...rest }) => {

    return <header {...rest} className={`w-full bg-white ${className ?? ""}`}>
        <ContentWrapper>
            <nav className="relative h-16 py-5 bg-white flex justify-between items-center">
                <Logo tabIndex={0} />
                <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                    {pageItems.map((item, index) => (
                        <NavItem
                            key={index}
                            href={item.href}
                            tabindex={item.tabindex}
                        >
                            {item.text}
                        </NavItem>
                    ))}
                </div>
                <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                    <div className="flex items-center gap-4">
                        <OpenModalButton />
                        <a href={"https://laemboscadura.com"} target="_blank" tabIndex={6}>
                            <MainButton text="La Emboscadura" color="primary" />
                        </a>
                    </div>
                    {user ? <UserDropdown
                        user={user}
                        menuSections={[
                            ...accountMenuItems,
                            { items: [logoutMenuItem] }
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
}