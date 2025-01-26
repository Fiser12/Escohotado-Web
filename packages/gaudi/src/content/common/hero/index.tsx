import classNames from "classnames";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { H1 } from "../../../common/headers/H1";
import { H2 } from "../../../common/headers/H2";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    quote?: string;
    image?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    changeDirection?: boolean;
    topHeader: boolean;
}

export const MainHero = ({
    topHeader = false,
    changeDirection = true,
    className,
    image,
    title,
    description,
    quote,
    children,
    ...rest
}: Props) => {

    const Header = topHeader ? H1 : H2;

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
                    {image}
                </div>
                <div className={contentClass}>
                    <div className="flex flex-col gap-5">
                        <Header label={title} />
                        <p className="line-clamp-6">{description}</p>
                        <p className={quoteClass}>{quote}</p>
                    </div>
                    <div className="w-full">{children}</div>
                </div>
            </ContentWrapper>
        </div>
    );
};
