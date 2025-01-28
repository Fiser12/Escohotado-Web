import { MainHero } from "../../../common/hero";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import { GridComments } from "../../../../common/comments/grid_comments";
import { CommentCard } from "../../../../common/comments";
import { CommentsSectionModel } from "hegel";
import classNames from "classnames";
import { SocialMediaShare } from "../../../../common/social_media";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    coverHref: string;
    description: string;
    langs: ('es' | 'en')[];
    link: string;
    bookButtons: React.ReactNode;
    commentsSectionModel: CommentsSectionModel;
    children: React.ReactNode;
}

export const BookDetail: React.FC<Props> = ({
    title,
    coverHref,
    description,
    bookButtons,
    commentsSectionModel,
    children,
    className,
    ...rest
}) => {
    const divClass = classNames("w-full bg-white", className);
    return (
        <div className={divClass} {...rest}>
            <MainHero
                topHeader={true}
                title={title}
                description={description}
                children={bookButtons}
                image={
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px] my-6" shadow={false}>
                        <Image
                            fill
                            src={coverHref}
                            alt={title}
                            className="object-cover"
                        />
                    </ImageParallax>
                }
            />
            {children && (
                <ContentWrapper className="flex flex-col gap-10">
                    {children}
                    <div className="border-t-2 border-gray-light flex justify-between items-center py-5">
                        <SocialMediaShare />
                    </div>
                </ContentWrapper>
            )}
            <ContentWrapper className="flex flex-col gap-12 pt-10">
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