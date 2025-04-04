import classNames from "classnames";
import Image from "next/image";
import { MainButtonAction, MainButtonActionProps } from "@/components/atoms/main-button";
import handwrittenBackground from "@/components/assets/images/handwritting-bg.jpg";
import { Typo } from "@/components/atoms/typographies";
import { routes } from "@/core/routes-generator";

interface BasicHighlightSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    coverHref?: string;
    type?: 'primary' | 'secondary';
}

export const BasicHighlightSection: React.FC<BasicHighlightSectionProps> = ({
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

export interface HighlightCTASectionProps extends BasicHighlightSectionProps {
    title: string
    buttons: MainButtonActionProps[]
}

export const HighlightCTASection: React.FC<HighlightCTASectionProps> = ({
    title, 
    coverHref = handwrittenBackground.src,
    buttons 
}) => (
    <BasicHighlightSection coverHref={coverHref}>
        <Typo.H4 className="text-white text-center">{title}</Typo.H4>
        <div className="flex flex-col gap-4">
            {buttons.map((button, index) => (
                <MainButtonAction className="whitespace-nowrap" key={index} {...button} />
            ))}
        </div>
    </BasicHighlightSection>
)

export const LockedHighlightSection: React.FC = () => (
    <HighlightCTASection
        title="¿Te gustaría acceder al contenido exclusivo de Escohotado?"
        buttons={[ {
            text: "Accede al contenido completo",
            color: "secondary",
            link: { href: routes.nextJS.subscriptionPageHref }
        }]}
    />
)
export const UnlocksDepletedHighlightSection: React.FC<{nextUnlockDate: Date}> = ({ nextUnlockDate }) => (
    <HighlightCTASection
        title={`¡Ya no quedan desbloqueos disponibles! Volveras a poder desbloquear el contenido el ${nextUnlockDate.toLocaleDateString()}`}
        buttons={[ {
            text: "Accede al contenido completo",
            color: "secondary",
            link: { href: routes.nextJS.subscriptionPageHref }
        }]}
    />
)

export const QuotesLockedHighlightSection: React.FC = () => (
    <HighlightCTASection
        coverHref={handwrittenBackground.src}
        title="Accede a las citas de Escohotado"
        buttons={[ {
            text: "Ir a las citas",
            color: "secondary",
            link: { href: routes.nextJS.citasPageHref }
        }]}
    />
)