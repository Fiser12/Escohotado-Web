import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { Logo } from "./logo"
import { type MenuSection, type UserModel, type Optional, routes } from 'hegel';
import { NavItem } from "./nav_item";
import { UserDropdown } from "./user_dropdown";
import { MainButton } from "../main_button/main_button";
import { HamburguerIcon } from "../icons/hamburguer_icon";
import { OpenModalButton } from "./open_search_modal_button";
import { ArrowLinkIcon } from "../icons/arrow_link";

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
        <header {...rest}>
            <ContentWrapper>
                <nav className="h-16 py-5 bg-white flex justify-between items-center">
                    <Logo tabIndex={0} />
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        <NavItem href={routes.nextJS.lecturasPageHref} tabindex={2}>Lecturas</NavItem>
                        <NavItem href={routes.nextJS.videosPageHref} tabindex={3}>Videos</NavItem>
                        <NavItem href={routes.nodeBB.root} tabindex={4}>Foro</NavItem> 
                        {hasPermission &&
                            <NavItem href={routes.nextJS.citasPageHref} tabindex={5}>Citas</NavItem>
                        }
                        <OpenModalButton />
                    </div>
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        <a href={routes.otherExternal.emboscadura} target="_blank" tabIndex={6}>
                            <MainButton text="La Emboscadura" color="primary" />
                        </a>

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
                                    <ArrowLinkIcon/>
                                </NavItem>
                            </button>
                        }
                    </div>
                    <div className="lg:hidden md:block">
                        <HamburguerIcon />
                    </div>
                </nav>
            </ContentWrapper>
        </header>
    )
}

