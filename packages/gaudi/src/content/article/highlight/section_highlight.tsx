import classNames from "classnames";
import { H4 } from "../../../common/headers/H4";
import Image from "next/image";
import { routes } from "hegel";
import Link from "next/link";
import { MainButton } from "../../../common/main_button/main_button";
import handwrittenBackground from "../../../assets/images/handwritting-bg.jpg";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    description: string;
    coverHref: string;
}

export const HighlightSection: React.FC<Props> = ({coverHref, description, className, children, ...rest}) => {
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
                {children}
            </div>
        </div>
    );
};

export const FreemiumHighlightSection: React.FC<{}> = () => (
    <HighlightSection 
        description="¿Te gustaría acceder al contenido exclusivo de Escohotado?" 
        coverHref={handwrittenBackground.src}>
        <Link href={routes.nextJS.subscriptionPageHref}>
            <MainButton text={"Accede al contenido completo"} color="secondary" type="line" className="max-w-70"></MainButton>
        </Link>
    </HighlightSection>
)