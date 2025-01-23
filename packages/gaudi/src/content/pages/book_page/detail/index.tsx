import { MainHero } from "../../../common/hero";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import { GridComments } from "../../../../common/comments/grid_comments";
import { CommentCard } from "../../../../common/comments";
import { Comment } from "hegel";

interface Props {
    title: string;
    coverHref: string;
    description: string;
    langs: ('es' | 'en')[];
    link: string;
    bookButtons: React.ReactNode;
    comments: Comment[];
    children: React.ReactNode;
}

export const BookDetail = (props: Props) => {

    return (
        <div className="w-full bg-white">
            <MainHero
                topHeader={true}
                title={props.title}
                description={props.description}
                children={props.bookButtons}
                image={
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px] my-6" shadow={false}>
                        <Image
                            fill
                            src={props.coverHref}
                            alt={props.title}
                            className="object-cover"
                        />
                    </ImageParallax>
                }
            />
            {props.children}
            <ContentWrapper className="flex flex-col gap-12 pt-10">
                <GridComments
                    items={props.comments}
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