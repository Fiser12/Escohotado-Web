import classNames from "classnames";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";

interface Props {
      className?: string;
}

export const Footer = (props: Props) => {
      return (
            <div className="bg-primary-900 w-full py-4 text-white border-t border-white font-body  text-xs md:text-sm">
                  <ContentWrapper className="flex flex-row justify-between items-center">
                        <div className="flex flex-col md:flex-row gap-1">
                              <p>&copy; 2024 Jorge Escohotado.</p>
                              <p className="italic">Todos los derechos reservados.</p>
                        </div>
                        <div id="socialMedia" className="flex flex-row gap-3 items-center">
                              <a href="#" target="_blank" id="X" className="cursor-pointer">
                                    <svg role="img" viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="w-6 h-6"
                                          fill="white"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                              </a>
                        </div>
                  </ContentWrapper>
            </div>
      );
}