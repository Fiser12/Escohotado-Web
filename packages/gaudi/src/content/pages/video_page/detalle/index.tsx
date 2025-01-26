import classNames from "classnames";
import { H3 } from "../../../../common/headers/H3";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../../common/tag/tag";
import { GridComments } from "../../../../common/comments/grid_comments";
import { CommentCard } from "../../../../common/comments";
import { CommentsSectionModel } from "hegel";
import { VideoEmbed } from "../../../../common/video_embed/video_embed";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    publishedAt: string;
    author?: string;
    duration: number;
    videoHref?: string | null;
    categories: {
        id: string;
        singular_name: string;
        seed?: string | null
    }[];
    commentsSectionModel: CommentsSectionModel;
    children: React.ReactNode;
}

export const VideoDetail: React.FC<Props> = ({
    className,
    title,
    publishedAt,
    categories,
    duration: durationStr,
    videoHref,
    children,
    commentsSectionModel,
    ...rest
}) => {
    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16 pt-12',
        className
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-3 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1 max-h-7'
    );
    const date = new Date(publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const duration = segundosAFormatoHHMMSS(durationStr);
    return (
        <div className={containerClass} {...rest}>
            <ContentWrapper className="flex flex-col gap-12">
                {videoHref &&
                    <VideoEmbed url={videoHref} />
                }
                <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                    <H3 label={title ?? "No title"} />
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {categories?.map((category, index) =>
                                <Tag key={index} text={category.singular_name}></Tag>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <p className="text-gray-disabled">{formattedDate}</p>
                            <p className="text-gray-disabled">Duración: {duration}</p>
                        </div>
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
function segundosAFormatoHHMMSS(totalSegundos: number) {
    const date = new Date(totalSegundos * 1000);
    return date.toISOString().slice(11, 19).replace("00:", "").replace("00:", "");
}
