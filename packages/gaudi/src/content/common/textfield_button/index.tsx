import classNames from "classnames";
import { MainButton } from "../../../common/main_button/main_button";
import { InputForm } from "../../../common/input";

interface Props {
      label: string;
      buttonText: string;
      text?: string;
      placeholder: string;
      state?: 'enabled' | 'disabled';
      className?: string;
      href: string;
      icon?: React.ReactNode;
}

export const TextFieldButton = (props: Props) => {

      return (
            <InputForm 
                  label={props.label}
                  text={props.text}
                  placeholder={props.placeholder}
                  state={props.state}
            >
                  <a href={props.href}>
                        <MainButton text={props.buttonText} color="secondary" icon={props.icon} />
                  </a>
            </InputForm>
      );
};