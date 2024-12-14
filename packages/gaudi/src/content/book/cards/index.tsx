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
        'flex flex-col items-center gap-3 h-full'
    );

    return (
        <a href={props.link} className="h-full w-full">
            <div className={containerClass}>
                <ImageParallax shadow={false} className="w-auto h-full">
                    <img
                        src={props.coverHref}
                        alt={props.title}
                        className="w-auto h-full max-h-[300px]"
                    />
                </ImageParallax>
                <H4 label={props.title} className="line-clamp-2 text-center px-4 w-full md:max-w-[80%]"></H4>
            </div>
        </a>
    );
};

