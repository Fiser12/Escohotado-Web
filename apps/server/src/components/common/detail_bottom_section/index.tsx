import { CommentsSectionModel, QuoteHeaderModel } from "hegel";
import classNames from "classnames";
import { CommentCard } from "../comments";
import { GridComments } from "../comments/grid_comments";
import { ContentWrapper } from "../content_wrapper/content_wrapper";
import { GridCards } from "@/components/content/grid_cards/GridCards";
import { Quote } from "payload-types";
import { BaseUser } from "payload-access-control";
import { mapQuoteCard } from '@/core/mappers/mapQuoteCard';

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
