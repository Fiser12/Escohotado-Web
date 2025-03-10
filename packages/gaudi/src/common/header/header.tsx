import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { Logo } from "./logo"
import { type MenuSection, type UserModel, type Optional, routes } from 'hegel';
import { NavItem } from "./nav_item";
import { UserDropdown } from "./user_dropdown";
import { MainButton } from "../main_button/main_button";
import { HamburguerIcon } from "../icons/hamburguer_icon";
import { OpenModalButton } from "./open_search_modal_button";
import { Hamburguer } from "./hamburguer";

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
                        <NavItem href={routes.nextJS.lecturasPageHref} text="Lecturas" tabindex={2} />
                        <NavItem href={routes.nextJS.videosPageHref} text="Vídeos" tabindex={3} />
                        { hasPermission &&
                            <NavItem href={routes.nextJS.citasPageHref} text="Citas" tabindex={4} />
                        }
                        <OpenModalButton />
                    </div>
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        {user ? <UserDropdown
                            user={user}
                            menuSections={[
                                ...menuSections,
                                { items: [{ 
                                    text: "Cerrar sesión", 
                                    action: signOut,
                                    target: "_black",
                                    href: routes.keycloak.logout 
                                }] 
                            }
                            ]}
                        /> : <form
                            action={async () => {
                                "use server";
                                await signIn();
                            }}
                        >
                            <button type="submit">
                                <MainButton text="Entrar" color="secondary" />
                            </button>
                        </form>
                        }
                    </div>
                    <div className="lg:hidden md:block">
                        <Hamburguer></Hamburguer>
                    </div>
                </nav>
            </ContentWrapper>
        </header>
    )
}

