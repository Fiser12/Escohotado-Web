import { InputForm } from "@/components/atoms/input";
import { MainButton } from "@/components/atoms/main_button/main_button";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
      label: string;
      buttonText: string;
      text?: string;
      placeholder: string;
      state?: 'enabled' | 'disabled';
      className?: string;
      name?: string;
      href: string;
      icon?: React.ReactNode;
}

export const TextFieldButton: React.FC<Props> = ({ label, text, placeholder, state, href, buttonText, icon, name, ...rest }) => {

      return (
            <InputForm
                  type="text"
                  name={name}
                  label={label}
                  text={text}
                  placeholder={placeholder}
                  state={state}
                  {...rest}
            >
                  <a href={href}>
                        <MainButton text={buttonText} color="secondary" icon={icon} />
                  </a>
            </InputForm>
      );
};