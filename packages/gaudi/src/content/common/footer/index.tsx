import classNames from "classnames";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { NavItem } from "../../../common/header/nav_item";
import { routes } from "hegel";
import { XIcon } from "../../../common/icons/social/x_icon";
import { FacebookIcon } from "../../../common/icons/social/facebook_icon";
import { InstagramIcon } from "../../../common/icons/social/instagram_icon";
import { YoutubeIcon } from "../../../common/icons/social/youtube_icon";
import { TikTokIcon } from "../../../common/icons/social/tiktok_icon";
import { IvooxIcon } from "../../../common/icons/social/ivoox_icon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export const Footer: React.FC<Props> = (className, ...props) => {
      const divClass = classNames(
            'bg-primary-900',
            'w-full',
            'py-4',
            'text-white',
            'border-t',
            'border-white',
            'font-body',
            'text-xs',
            'md:text-sm',
            className
      )
      return (
            <div className={divClass} {...props}>
                  <ContentWrapper className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="w-full flex flex-row gap-4 flex-wrap justify-center">
                              <NavItem href={routes.otherExternal.youtube} variant="secondary">
                                    <YoutubeIcon className="w-7 h-7" />
                              </NavItem>
                              <NavItem href={routes.otherExternal.x} variant="secondary">
                                    <XIcon className="w-7 h-7" />
                              </NavItem>
                              <NavItem href={routes.otherExternal.facebook} variant="secondary">
                                    <FacebookIcon className="w-7 h-7" />
                              </NavItem>
                              <NavItem href={routes.otherExternal.instagram} variant="secondary">
                                    <InstagramIcon className="w-7 h-7" />
                              </NavItem>
                              <NavItem href="https://www.tiktok.com/@escohotadooficial?lang=es" variant="secondary">
                                    <TikTokIcon className="w-7 h-7" />
                              </NavItem>
                              <NavItem href="https://www.ivoox.com/perfil-antonio-escohotado_a8_podcaster_25202660_1.html" variant="secondary">
                                    <IvooxIcon className="w-7 h-7" />
                              </NavItem>
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-4 items-center md:justify-end">
                              <NavItem className="self-end md:self-center" href={routes.nextJS.privacidadPageHref} variant="secondary">Privacidad</NavItem>
                              <NavItem className="self-end md:self-center" href={routes.nextJS.termsAndConditionsPageHref} variant="secondary">Terminos y condiciones</NavItem>
                              <p className="self-end md:self-center">&copy; 2024 Jorge Escohotado</p>
                        </div>
                  </ContentWrapper>
            </div>
      );
}