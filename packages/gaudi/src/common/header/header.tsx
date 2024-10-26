import { ContentWrapper } from "../content_wrapper/content_wrapper"
import { EscotaButton } from "../escota_button/escota_button"
import { Logo } from "./logo"
import type { MenuSection, UserModel, Optional } from 'hegel';
import { NavItem } from "./nav_item";
import { UserMenu } from "./user_menu";

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
                <nav className="h-20 py-5 bg-white flex justify-between items-center">
                    <Logo tabindex={0} />
                    <div className="hidden lg:flex justify-end items-center lg:gap-4 xl:gap-6 xxl:gap-6 flex-shrink-0">
                        <NavItem href="/ad-memoriam" text="Ad Memoriam" tabindex={1} />
                        <NavItem href="/biblioteca" text="Biblioteca" tabindex={2} />
                        <NavItem href="/articulos" text="Artículos" tabindex={3} />
                        <NavItem href="/videos" text="Videos" tabindex={4} />
                        <NavItem href="/eventos" text="Eventos" tabindex={5} />
                        <div className="h-8 justify-start items-center gap-2.5 inline-flex">
                            <a href="https://laemboscadura.com/" tabIndex={6}>
                                <EscotaButton text="La emboscadura" variant="primary" />
                            </a>
                        </div>
                        {user ? <UserMenu 
                            user={user} 
                            menuSections={[
                                ...menuSections,
                                { items: [{text: "Cerrar sesión", action: signOut}] }
                            ]}
                        /> : <form
                            action={async () => {
                                "use server";
                                await signIn();
                            }}
                        >
                            <button type="submit">
                                <EscotaButton text="Entrar" variant="secondary" />
                            </button>
                        </form>
                        }
                    </div>
                </nav>

            </ContentWrapper>
        </header>
    )
}

