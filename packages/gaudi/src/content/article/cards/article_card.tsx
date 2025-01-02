import classNames from "classnames";
import { Link } from "../../../common/links/link";
import { Tag } from "../../../common/tag/tag";
import { LockIcon } from "../../../common/icons/lock_icon";
import Image from "next/image";

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
}

export const ArticleCard = (props: Props) => {
    const cardClass = classNames(
        'w-full min-h-[350px] rounded flex flex-col flex-grow m-auto',
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
    );

    const imageClass = classNames(
        'w-full h-full object-cover',
        {
            'opacity-50': !props.hasPermission,
        }
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1 px-3'
    );
    const date = new Date(props.publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={cardClass}>
            <div className="p-1 flex flex-col gap-3 flex-1">
                <div className="relative bg-black w-full h-[150px] overflow-hidden rounded">
                    <Image
                        fill
                        src={props.coverHref}
                        alt={props.title}
                        className={imageClass}
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
                    <p className="font-body text-sm">{formattedDate}</p>
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
