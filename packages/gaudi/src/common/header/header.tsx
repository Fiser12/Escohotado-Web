import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { Logo } from "./logo"
import type { MenuSection, UserModel, Optional } from 'hegel';
import { NavItem } from "./nav_item";
import { UserMenu } from "./user_menu/user_menu";
import { MainButton } from "../main_button/main_button";
import { HamburguerIcon } from "../icons/hamburguer_icon";

export interface Props {
    className?: string
    user: Optional<UserModel>
    menuSections: MenuSection[]
    signIn: () => Promise<void>
    signOut: () => Promise<void>
}

export const Header = ({
    user,
    signIn,
    signOut,
    menuSections
}: Props): JSX.Element => {

    return (
        <header>
            <ContentWrapper>
                <nav className="h-16 py-5 bg-white flex justify-between items-center">
                    <Logo tabindex={0} />
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        <NavItem href="/ad-memoriam" text="Ad Memoriam" tabindex={1} />
                        <NavItem href="/articulos" text="Lecturas" tabindex={2} />
                        <NavItem href="/filmoteca" text="Filmoteca" tabindex={3} />
                    </div>
                    <div className="hidden lg:flex justify-center items-center gap-7 shrink-0">
                        <a href="https://laemboscadura.com/" tabIndex={4}>
                            <MainButton text="La emboscadura" icon="" />
                        </a>
                        {user ? <UserMenu
                            user={user}
                            menuSections={[
                                ...menuSections,
                                { items: [{ text: "Cerrar sesión", action: signOut }] }
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
                        <HamburguerIcon></HamburguerIcon>
                    </div>
                </nav>
            </ContentWrapper>
        </header>
    )
}

