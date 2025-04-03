import classNames from "classnames";
import { ContentWrapper } from "../../../layout/content-wrapper";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    media: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    changeDirection?: boolean;
}

export const MainHero = ({
    changeDirection = true,
    className,
    media,
    children,
    ...rest
}: Props) => {

    const heroClass = classNames(
        'w-full min-h-[600px] flex items-center justify-center font-body',
        className,
    );

    const containerClass = classNames(
        'h-full grid grid-rows-1 md:grid-cols-2 items-center'
    );

    const imageContainerClass = classNames(
        'w-full flex justify-center items-center',
        {
            'md:order-1': changeDirection,
            'md:order-2': !changeDirection,
        }
    );

    const contentClass = classNames(
        'w-full flex flex-col gap-3 pb-12',
        {
            'md:order-2': changeDirection,
            'md:order-1': !changeDirection,
        }
    );

    const quoteClass = classNames('text-primary-500 text-sm');

    return (
        <div className={heroClass} {...rest}>
            <ContentWrapper className={containerClass}>
                <div className={imageContainerClass}>
                    {media}
                </div>
                <div className={contentClass}>
                    {children}
                </div>
            </ContentWrapper>
        </div>
    );
};
