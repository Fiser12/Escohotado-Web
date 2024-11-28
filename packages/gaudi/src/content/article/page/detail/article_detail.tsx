import classNames from "classnames";
import { H1 } from "../../../../common/headers/H1";
import { H4 } from "../../../../common/headers/H4";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../../common/tag/tag";
import "./article-html-content.css";

interface Props {
    title: string;
    publishedAt: string;
    author?: string;
    textLink: string;
    coverHref: string;
    href: string;
    categories: {
        id: string;
        singular_name: string;
        seed?: string | null
    }[];
    contentHtml: string;
}

export const ArticleDetail = (props: Props) => {
    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16'
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-3 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1'
    );

    return (
        <div className={containerClass}>
            <img
                src={props.coverHref}
                alt={props.title}
                className="w-full object-cover h-[200px] md:h-[350px]"
            />
            <ContentWrapper className="flex flex-col gap-12">
                <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-2">
                        <H4 label={props.author ?? ""}></H4>
                        <H1 label={props.title ?? "No title"} />
                    </div>
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {props.categories?.map((category, index) =>
                                <Tag key={index} text={category.singular_name}></Tag>
                            )}
                        </div>
                        <p className="text-gray-disabled">{props.publishedAt}</p>
                    </div>
                </div>
                <div className="article-html-content" dangerouslySetInnerHTML={{ __html: props.contentHtml ?? "<p>Empty</p>" }} />
            </ContentWrapper>
        </div>
    );
};
