import classNames from "classnames";
import { H3 } from "../../../common/headers/H3";
import { EmailIcon } from "../../../common/icons/email_icon";
import { InputForm } from "../../../common/input";
import { MainButton } from "../../../common/main_button/main_button";
import { routes } from "hegel";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> { }

export const NewsletterSubscription: React.FC<Props> = (className, ...rest) => {
      const divClass = classNames(
            "bg-primary-900 w-full py-16 px-10",
            className
      )

      return <form 
            method="post" 
            action={routes.newsletter.newsletterSubscriptionForm} 
            className={divClass} 
            target="_blank" 
            {...rest}
      >
            <div className="flex flex-col justify-baseline items-center gap-8 max-w-[600px] mx-auto">
            <H3 label="¡Únete a nuestra comunidad del conocimiento!" className="text-primary-100" />
            <input type="hidden" name="nonce" />
            <input type="hidden" name="l" value="d5e07ef4-a728-4003-b3a7-c803298ae4ce" />
            <p className="text-white font-body">Introduce tu email para recibir nuestra newsletter con las últimas reflexiones filosóficas, análisis históricos y exploraciones sobre el capitalismo y las drogas, al estilo de Antonio Escohotado.</p>
            <div className="flex md:flex-row flex-col gap-4 w-full">
            <InputForm
                  label={"name"}
                  name={"name"}
                  type="text"
                  placeholder={"Nombre"}
                  state={"enabled"}
                  {...rest}
            >
            </InputForm>
            <InputForm
                  label={"email"}
                  name={"email"}
                  type="email"
                  placeholder={"Email"}
                  className="w-full"
                  state={"enabled"}
                  {...rest}
            >
                  <button type="submit">
                        <MainButton text={"Suscribirse"} color="secondary" icon={<EmailIcon />} />
                  </button>
            </InputForm>
            </div>
            </div>
      </form>
};