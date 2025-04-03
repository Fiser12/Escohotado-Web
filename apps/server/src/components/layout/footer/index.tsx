import { FacebookIcon, InstagramIcon, IvooxIcon, TikTokIcon, XIcon, YoutubeIcon } from "@/components/assets/icons";
import classNames from "classnames";
import { ContentWrapper } from "../content-wrapper";
import { NavItem } from "../header/nav_item";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
      youtubeHref?: string
      xHref?: string
      facebookHref?: string
      instagramHref?: string
      tiktokHref?: string
      ivooxHref?: string
      privacidadHref: string
      termsAndConditionsHref: string
}

export const Footer: React.FC<Props> = ({
      className,
      youtubeHref,
      xHref,
      facebookHref,
      instagramHref,
      tiktokHref,
      ivooxHref,
      privacidadHref,
      termsAndConditionsHref,
      ...props
}) => {
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
                              {youtubeHref && <NavItem href={youtubeHref} variant="secondary">
                                    <YoutubeIcon className="w-7 h-7" />
                              </NavItem>}
                              {xHref && <NavItem href={xHref} variant="secondary">
                                    <XIcon className="w-7 h-7" />
                              </NavItem>}
                              {facebookHref && <NavItem href={facebookHref} variant="secondary">
                                    <FacebookIcon className="w-7 h-7" />
                              </NavItem>}
                              {instagramHref && <NavItem href={instagramHref} variant="secondary">
                                    <InstagramIcon className="w-7 h-7" />
                              </NavItem>}
                              {tiktokHref && <NavItem href={tiktokHref} variant="secondary">
                                    <TikTokIcon className="w-7 h-7" />
                              </NavItem>}
                              {ivooxHref && <NavItem href={ivooxHref} variant="secondary">
                                    <IvooxIcon className="w-7 h-7" />
                              </NavItem>}
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-4 items-center md:justify-end">
                              <NavItem className="self-end md:self-center" href={privacidadHref} variant="secondary">Privacidad</NavItem>
                              <NavItem className="self-end md:self-center" href={termsAndConditionsHref} variant="secondary">Terminos y condiciones</NavItem>
                              <p className="self-end md:self-center">&copy; 2024 Jorge Escohotado</p>
                        </div>
                  </ContentWrapper>
            </div>
      );
}