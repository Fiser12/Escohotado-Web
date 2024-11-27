import classNames from "classnames";
import { H2 } from "../../common/headers/H2";
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
    hasPermission: boolean;
    contentHtml: string;
}

export const ArticleDetail = (props: Props) => {
    const cardClass = classNames(
        'w-full',
        {
            'bg-white text-black': props.hasPermission,
            'bg-gray-light text-gray-dark border-solid border-[0.8px] border-gray-disabled pb-2': !props.hasPermission,
        }
    );

    return (<div className={cardClass}>
        <H2 label={props.title ?? "No title"} />
        <img
            src={props.coverHref}
            alt={props.title}
            className="w-full h-full object-cover"
        />
        <div className="article-html-content" dangerouslySetInnerHTML={{ __html: props.contentHtml ?? "<p>Empty</p>" }}/>
    </div>);
};

/*

*/