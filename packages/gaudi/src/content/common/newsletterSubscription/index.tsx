import classNames from "classnames";
import { H3 } from "../../../common/headers/H3";
import { TextFieldButton } from "../textfield_button";
import { EmailIcon } from "../../../common/icons/email_icon";

interface Props { }

export const NewsletterSubscription = (props: Props) => {
      return (
            <div className="bg-primary-900 w-full py-16 px-10">
                  <div className="flex flex-col justify-baseline items-center gap-8 max-w-[600px] mx-auto">
                        <H3 label="¡Únete a nuestra comunidad del conocimiento!" className="text-primary-100" />
                        <p className="text-white font-body">Introduce tu email para recibir nuestra newsletter con las últimas reflexiones filosóficas, análisis históricos y exploraciones sobre el capitalismo y las drogas, al estilo de Antonio Escohotado.</p>
                        <TextFieldButton
                              label="Correo Electrónico"
                              buttonText="Suscribirse"
                              placeholder="Introduce tu correo"
                              href="https://example.com/subscribe"
                              icon={<EmailIcon />} // Opcional, ícono al lado del botón
                              state="enabled"
                        />
                  </div>
            </div>
      );
};