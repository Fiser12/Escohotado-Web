import classNames from "classnames";
import { ImageParallax } from "./image_parallax";
import { H4 } from "../../../common/headers/H4";

interface Props {
    title: string;
    coverHref: string;
    link: string;
    className?: string; 
}

export const BookCard = (props: Props) => {
    const containerClass = classNames(
        'min-w-[250px] flex flex-col gap-2'
    );

    return (
        <a href={props.link}>
            <div className={containerClass}>
                <ImageParallax
                    shadow={false}
                    className="h-full w-full"
                >
                    <img src={props.coverHref} alt={props.title} className="h-full object-cover mx-auto"/>
                </ImageParallax>
                <H4 label={props.title} className="line-clamp-3 text-center pb-3 px-4 w-full"></H4>
            </div>
        </a>
    );
};
