import classNames from "classnames";
import { Link } from "../../common/links/link";
import { Tag } from "../../common/tag/tag";
import { LockIcon } from "../../common/icons/lock_icon";
import { text } from "stream/consumers";
import { H3 } from "../../common/headers/H3";

interface Props {
    title: string;
    publishedAt: string;
    textLink: string;
    coverHref: string;
    href: string;
    categories: {
        id: string;
        singular_name: string;
        seed?: string | null
    }[];
    hasPermission: boolean;
}
export const ArticleCard = (props: Props) => {
    const cardClass = classNames(
        'w-[340px] h-[340px] rounded-generic p-1',
        {
            'bg-white text-black': props.hasPermission,
            'bg-gray-light text-gray-dark border-solid border-[0.8px] border-gray-disabled': !props.hasPermission,
        }
    );

    const containerTextClass = classNames(
        'flex flex-col '
    );

    return (
        <div className={cardClass}>
            <div className="h-[170px] relative">
                {props.hasPermission ?
                    <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center absolute top-0 left-0">
                        <LockIcon></LockIcon>
                    </div>
                    : null}
                <img src={props.coverHref} alt={props.title} className="w-full h-full object-cover absolute top-0 left-0" />
            </div>
            <div className={containerTextClass}>
                <div>
                    {props.categories?.map((category, index) =>
                        <Tag key={index} text={category.singular_name}></Tag>
                    )}
                </div>
                <H3 label={props.title} />
                <p className="font-body text-sm">{props.publishedAt}</p>
            </div>
            {props.hasPermission ? <Link href={props.href} text={props.textLink}></Link> : null}
        </div>
    );
};
