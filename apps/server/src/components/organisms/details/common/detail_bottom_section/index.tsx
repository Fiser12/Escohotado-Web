import { CommentCard } from "@/components/organisms/details/common/comments";
import { GridComments } from "@/components/organisms/details/common/comments/grid_comments";
import { GridCards } from "@/components/organisms/lexical/grid_cards";
import { mapQuoteCard } from '@/core/mappers/map-quote-card';
import classNames from "classnames";
import { CommentsSectionModel } from "hegel";
import { BaseUser } from "payload-access-control";
import { Quote } from "payload-types";
import { ContentWrapper } from "../../../../layout/content-wrapper";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    comments: CommentsSectionModel;
    quotes: Quote[];
    user?: BaseUser | null;
}

export const DetailBottomSection: React.FC<Props> = ({ quotes, comments, className, user, ...rest }) => {
    const divClass = classNames("flex flex-col gap-6 ", className);
    const quotesModel = quotes.mapNotNull(mapQuoteCard(user));
    return (
        <ContentWrapper className={divClass} {...rest}>
            {quotesModel.length !== 0 &&
                <GridCards
                    features={quotesModel.map(t => ({ ...t, className: "col-span-2" }))}
                    className='grid-cols-2 md:grid-cols-4 lg:grid-cols-8'
                />
            }
            <GridComments
                items={comments.comments}
                forumTopicId={comments.forumTopicId}
                renderBox={(comment) => (
                    <CommentCard
                        user={comment.user}
                        date={comment.date}
                        comment={comment.comment} />
                )}
            />
        </ContentWrapper>
    );
};
