import classNames from "classnames";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { H2 } from "../../../common/headers/H2";

interface Props {
    title: string;
    description: string;
    quote?: string;
    image?: React.ReactNode;
    children?: React.ReactNode;
}

export const MainHero = (props: Props) => {
    const heroClass = classNames(
        'w-full min-h-[600px] bg-gray-light flex items-center justify-center font-body'
    );

    const containerClass = classNames(
        'h-full grid grid-rows-1 md:grid-cols-2 items-center gap-10 lg:gap-0 py-12 pr-0 md:pr-8'
    );

    const quoteClass = classNames(
        'text-primary-500 text-sm pb-2'
    );

    return (
        <div className={heroClass}>
            <ContentWrapper className={containerClass}>
                <div className="flex justify-center items-center  px-8 lg:px-4">
                    {props.image}
                </div>
                <div className="w-full flex flex-col gap-5" >
                    <H2 label={props.title} />
                    <p className="line-clamp-6">{props.description}</p>
                    <p className={quoteClass}>{props.quote}</p>
                    {props.children}
                </div>
            </ContentWrapper>
        </div>
    );
};
