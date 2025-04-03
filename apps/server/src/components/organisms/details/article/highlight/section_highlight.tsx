import handwrittenBackground from "@/components/assets/images/handwritting-bg.jpg";
import { MainButton } from "@/components/atoms/main-button";
import { Typo } from "@/components/atoms/typographies";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    coverHref?: string;
    type?: 'primary' | 'secondary';
}

export const HighlightSection: React.FC<Props> = ({
    coverHref = handwrittenBackground.src,
    type = 'primary',
    className,
    children,
    ...rest
}) => {
    const containerClass = classNames(
        'w-full py-12.5 px-5 text-white relative overflow-hidden',
        {
            'bg-black': type === 'primary',
            'bg-primary-100': type === 'secondary',
        },
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
                {children}
            </div>
        </div>
    );
};

export const FreemiumHighlightSection: React.FC<{
    href: string
    title: string
    buttonText: string
}> = ({ href, title, buttonText }) => (
    <HighlightSection >
        <Typo.H4 className="text-white text-center">{title}</Typo.H4>
        <Link href={href}>
            <MainButton text={buttonText} color="secondary" type="line" className="max-w-70"></MainButton>
        </Link>
    </HighlightSection>
)