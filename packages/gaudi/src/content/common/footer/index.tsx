import classNames from "classnames";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { NavItem } from "../../../common/header/nav_item";
import { routes } from "hegel";
import { XIcon } from "../../../common/icons/social/x_icon";
import { FacebookIcon } from "../../../common/icons/social/facebook_icon";
import { InstagramIcon } from "../../../common/icons/social/instagram_icon";
import { YoutubeIcon } from "../../../common/icons/social/youtube_icon";

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
                  <ContentWrapper className="flex flex-row justify-between items-center">
                        <div className="grid grid-cols-2 gap-6 md:flex md:flex-row md:items-center">
                              <NavItem href={routes.otherExternal.youtube} variant="secondary">
                                    <YoutubeIcon className="w-7 h-7"/>
                              </NavItem>
                              <NavItem href={routes.otherExternal.x} variant="secondary">
                                    <XIcon className="w-7 h-7"/>
                              </NavItem>
                              <NavItem href={routes.otherExternal.facebook} variant="secondary">
                                    <FacebookIcon className="w-7 h-7"/>
                              </NavItem>
                              <NavItem href={routes.otherExternal.instagram} variant="secondary">
                                    <InstagramIcon className="w-7 h-7"/>
                              </NavItem>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-center ">
                              <NavItem className="self-end md:self-center" href={routes.nextJS.privacidadPageHref} variant="secondary">Privacidad</NavItem>
                              <NavItem className="self-end md:self-center" href={routes.nextJS.termsAndConditionsPageHref} variant="secondary">Terminos y condiciones</NavItem>
                              <p className="self-end md:self-center">&copy; 2024 Jorge Escohotado</p>
                        </div>
                  </ContentWrapper>
            </div>
      );
}