import classNames from "classnames";
import { H4 } from "../../../server";
import { ImageParallax } from "./image_parallax";

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
                className="max-h-[507px]"
                shadow={false}
            >
                <img src={props.coverHref} alt={props.title} />
            </ImageParallax>

            <H4 label={props.title} className="line-clamp-3"></H4>
        </a>
    );
};
