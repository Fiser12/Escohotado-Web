import { Typo } from "@/components/atoms/typographies";
import classNames from "classnames";
import Image from "next/image";
import Link from 'next/link';
import { ImageParallax } from "./image_parallax";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    coverHref: string;
    link: string;
    className?: string;
}

export const BookCard: React.FC<Props> = ({ className, coverHref, link, title, ...rest }) => {
    const containerClass = classNames(
        'flex flex-col items-center gap-3 h-full',
        className
    );

    return (
        <Link href={link}>
            <div className={containerClass} {...rest}>
                <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[200px] min-[469px]:h-[300px]" shadow={false}>
                    <Image
                        fill
                        src={coverHref}
                        alt={title}
                        className="object-cover"
                    />
                </ImageParallax>
                <Typo.H4 className="line-clamp-3 text-center px-4 w-full md:max-w-[80%]">{title}</Typo.H4>
            </div>
        </Link>
    );
};

