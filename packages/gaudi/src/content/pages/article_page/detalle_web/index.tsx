import classNames from "classnames";
import { H1 } from "../../../../common/headers/H1";
import { H4 } from "../../../../common/headers/H4";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../../common/tag/tag";
import { GridComments } from "../../../../common/comments/grid_comments";
import { CommentCard } from "../../../../common/comments";
import "./article-html-content.css";
import Image from "next/image";
import { CommentsSectionModel } from "hegel";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    publishedAt: string;
    author?: string;
    textLink: string;
    coverHref: string;
    categories: {
        id: string;
        singular_name: string;
        seed?: string | null
    }[];
    commentsSectionModel: CommentsSectionModel;
    children: React.ReactNode;
}

export const ArticleDetail: React.FC<Props> = ({
    publishedAt,
    author,
    title,
    coverHref,
    categories,
    commentsSectionModel,
    children,
    className,
    ...rest
}) => {
    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16',
        className
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-3 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1'
    );
    const date = new Date(publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className={containerClass} {...rest}>
            <div className="relative w-full h-[200px] md:h-[350px]">
                <Image
                    fill
                    src={coverHref}
                    alt={title}
                    className="object-cover"
                />
            </div>
            <ContentWrapper className="flex flex-col gap-12">
                <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-2">
                        <H4 label={author ?? ""}></H4>
                        <H1 label={title ?? "No title"} />
                    </div>
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {categories?.map((category, index) =>
                                <Tag key={index} text={category.singular_name}></Tag>
                            )}
                        </div>
                        <p className="text-gray-disabled">{formattedDate}</p>
                    </div>
                </div>
            </ContentWrapper>
            {children}
            <ContentWrapper>
                <GridComments
                    items={commentsSectionModel.comments}
                    forumTopicId={commentsSectionModel.forumTopicId}
                    renderBox={(comment) => (
                        <CommentCard
                            user={comment.user}
                            date={comment.date}
                            comment={comment.comment}
                        />
                    )}
                />
            </ContentWrapper>
        </div>
    );
};
