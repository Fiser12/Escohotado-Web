import classNames from "classnames";
import { ImageParallax } from "./image_parallax";
import { H4 } from "../../../common/headers/H4";

interface Props {
    title: string;
    coverHref: string;
    link: string;
}

export const BookCard = (props: Props) => {
    const containerClass = classNames(
        'flex flex-col gap-5'
    );

    return (
        <a className={containerClass} href={props.link}>
            <ImageParallax
                className="max-h-[550px]"
                shadow={false}
            >
                <img src={props.coverHref} alt={props.title} />
            </ImageParallax>

            <H4 label={props.title} className="line-clamp-3 text-center pb-3 px-4"></H4>
        </a>
    );
};
