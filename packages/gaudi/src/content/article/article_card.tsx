import classNames from "classnames";
import { Link } from "../../common/links/link";
import { Tag } from "../../common/tag/tag";
import { LockIcon } from "../../common/icons/lock_icon";

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
        'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-h-[350px] rounded-generic flex flex-col flex-grow m-auto',
        {
            'bg-white text-black': props.hasPermission,
            'bg-gray-light text-gray-dark border-solid border-[0.8px] border-gray-disabled pb-2': !props.hasPermission,
        }
    );

    const containerClass = classNames(
        'w-full flex flex-col justify-between flex-1 px-3 gap-1'
    );

    const overlayClass = classNames(
        'absolute inset-0 flex items-center justify-center',
        {
            'bg-black bg-opacity-40 z-10': !props.hasPermission,
        }
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1 px-3'
    );

    return (
        <div className={cardClass}>
            <div className="p-1 flex flex-col gap-3 flex-1">
                <div className="relative w-full h-[150px] overflow-hidden">
                    <img
                        src={props.coverHref}
                        alt={props.title}
                        className="w-full h-full object-cover"
                    />
                    <div className={overlayClass}>
                        {!props.hasPermission && <LockIcon />}
                    </div>
                </div>
                <div className={categoriesClass}>
                    {props.categories?.map((category, index) =>
                        <Tag key={index} text={category.singular_name}></Tag>
                    )}
                </div>
                <div className={containerClass}>
                    <p className="font-display text-lg md:text-xl line-clamp-3 break-words">{props.title}</p>
                    <p className="font-body text-sm">{props.publishedAt}</p>
                </div>
            </div>
            {props.hasPermission && (
                <div>
                    <Link href={props.href} text={props.textLink} className="px-3 py-2" />
                </div>
            )}
        </div>
    );
};
