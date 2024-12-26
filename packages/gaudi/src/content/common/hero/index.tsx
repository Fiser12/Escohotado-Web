import classNames from "classnames";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { H1 } from "../../../common/headers/H1";
import { H2 } from "../../../common/headers/H2";

interface Props {
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
    ...props
}: Props) => {

    const Header = topHeader ? H1 : H2;

    const heroClass = classNames(
        'w-full min-h-[600px] flex items-center justify-center font-body',
        props.className,
    );

    const containerClass = classNames(
        'h-full grid grid-rows-1 md:grid-cols-2 items-center gap-10 lg:gap-0 py-12 pr-0 md:pr-8'
    );

    const imageContainerClass = classNames(
        'flex justify-center items-center',
        {
            'md:order-1': changeDirection,
            'md:order-2': !changeDirection,
        }
    );

    const contentClass = classNames(
        'w-full flex flex-col gap-3',
        {
            'md:order-2': changeDirection,
            'md:order-1': !changeDirection,
        }
    );

    const quoteClass = classNames('text-primary-500 text-sm');

    return (
        <div className={heroClass}>
            <ContentWrapper className={containerClass}>
                <div className={imageContainerClass}>
                    {props.image}
                </div>
                <div className={contentClass}>
                    <div className="flex flex-col gap-5">
                        <Header label={props.title} />
                        <p className="line-clamp-6">{props.description}</p>
                        <p className={quoteClass}>{props.quote}</p>
                    </div>
                    <div className="w-full">{props.children}</div>
                </div>
            </ContentWrapper>
        </div>
    );
};
