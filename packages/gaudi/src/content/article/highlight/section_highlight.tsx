import classNames from "classnames";
import { H4 } from "../../../common/headers/H4";
import { MainButton } from "../../../common/main_button/main_button";

interface Props {
    description: string;
    textButton: string;
    href: string;
    coverHref: string;
}

export const HighlightSection = (props: Props) => {
    return (
        <div className="w-full bg-black py-12.5 px-5 text-white relative overflow-hidden">
            <img
                src={props.coverHref}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
            />
            <div className="relative z-10 flex flex-col justify-center items-center gap-7.5">
                <H4 label={props.description} className="text-white text-center"></H4>
                <a href={props.href}>
                    <MainButton text={props.textButton} color="secondary" type="line"></MainButton>
                </a>
            </div>
        </div>
    );
};
