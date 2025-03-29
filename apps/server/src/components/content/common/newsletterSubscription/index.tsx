import classNames from "classnames";
import { H3 } from "../../../common/headers/H3";
import { InputForm } from "../../../common/input";
import { MainButton } from "../../../common/main_button/main_button";
import { EmailIcon } from "@/components/assets/icons";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
      action: string
 }

export const NewsletterSubscription: React.FC<Props> = ({className, action }) => {
      const divClass = classNames(
            "bg-primary-900 w-full py-16 px-10",
            className
      )

      return <form
            method="post"
            action={action}
            className={divClass}
            target="_blank"
      >
            <div className="flex flex-col items-start gap-8 max-w-[600px] mx-auto">
                  <H3 label="¡Únete a nuestra comunidad del conocimiento!" className="text-primary-100" />
                  <input type="hidden" name="nonce" />
                  <input type="hidden" name="l" value="d5e07ef4-a728-4003-b3a7-c803298ae4ce" />
                  <p className="text-white font-body">Introduce tu email para recibir nuestra newsletter con las últimas reflexiones filosóficas, análisis históricos y exploraciones sobre el capitalismo y las drogas, al estilo de Antonio Escohotado.</p>
                  <div className="flex md:flex-row flex-col gap-7 md:gap-4 w-full">
                        <div className="flex gap-2 flex-col sm:flex-row">
                              <InputForm
                                    label={"name"}
                                    name={"name"}
                                    type="text"
                                    placeholder={"Nombre"}
                                    state={"enabled"}
                              >
                              </InputForm>
                              <InputForm
                                    label={"email"}
                                    name={"email"}
                                    type="email"
                                    placeholder={"Email"}
                                    className="w-full"
                                    state={"enabled"}
                              >
                              </InputForm>
                        </div>
                        <button type="submit">
                              <MainButton text={"Suscribirse"} color="secondary" icon={<EmailIcon />} className="h-full w-full" />
                        </button>
                  </div>
            </div>
      </form>
};