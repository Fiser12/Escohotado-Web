import classNames from "classnames";
import { H4 } from "../../../common/headers/H4";
import { MainButton } from "../../../common/main_button/main_button";
import Image from "next/image";
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    description: string;
    textButton: string;
    href: string;
    coverHref: string;
}

export const HighlightSection: React.FC<Props> = ({coverHref, textButton, href, description, className, ...rest}) => {
    const containerClass = classNames(
        'w-full bg-black py-12.5 px-5 text-white relative overflow-hidden',
        className
    )
    return (
        <div className={containerClass} {...rest}>
            <Image
                fill
                src={coverHref}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
            />
            <div className="relative z-10 flex flex-col justify-center items-center gap-7.5">
                <H4 label={description} className="text-white text-center"></H4>
                <Link href={href}>
                    <MainButton text={textButton} color="secondary" type="line"></MainButton>
                </Link>
            </div>
        </div>
    );
};
