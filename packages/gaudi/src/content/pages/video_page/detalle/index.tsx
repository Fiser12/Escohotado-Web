import classNames from "classnames";
import { H3 } from "../../../../common/headers/H3";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../../common/tag/tag";
import { GridComments } from "../../../../common/comments/grid_comments";
import { CommentCard } from "../../../../common/comments";
import { CommentsSectionModel } from "hegel";
import { VideoEmbed } from "../../../../common/video_embed/video_embed";

interface Props {
    title: string;
    publishedAt: string;
    author?: string;
    textLink: string;
    duration: number;
    videoHref?: string | null;
    coverHref: string;
    categories: {
        id: string;
        singular_name: string;
        seed?: string | null
    }[];
    commentsSectionModel: CommentsSectionModel;
    children: React.ReactNode;
}

export const VideoDetail = (props: Props) => {
    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16 pt-12'
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-3 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1'
    );
    const date = new Date(props.publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const duration = segundosAFormatoHHMMSS(props.duration);
    return (
        <div className={containerClass}>
            <ContentWrapper className="flex flex-col gap-12">
                {props.videoHref &&
                    <VideoEmbed url={props.videoHref} />
                }
                <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                    <H3 label={props.title ?? "No title"} />
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {props.categories?.map((category, index) =>
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
            {props.children}
            <ContentWrapper>
                <GridComments
                    items={props.commentsSectionModel.comments}
                    forumTopicId={props.commentsSectionModel.forumTopicId}
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
