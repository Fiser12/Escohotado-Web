import classNames from "classnames";
import { ImageParallax } from "./image_parallax";
import { H4 } from "../../../common/headers/H4";
import Image from "next/image";

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
        <a href={props.link}>
            <div className={containerClass}>
                <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[200px] min-[469px]:h-[300px]" shadow={false}>
                    <Image
                        fill
                        src={props.coverHref}
                        alt={props.title}
                        className="object-cover"
                    />
                </ImageParallax>
                <H4 label={props.title} className="line-clamp-3 text-center px-4 w-full md:max-w-[80%]"></H4>
            </div>
        </a>
    );
};

