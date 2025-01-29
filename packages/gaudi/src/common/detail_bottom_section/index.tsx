import { CommentsSectionModel, QuoteHeaderModel } from "hegel";
import classNames from "classnames";
import { CommentCard } from "../comments";
import { GridComments } from "../comments/grid_comments";
import { ContentWrapper } from "../content_wrapper/content_wrapper";
import { GridCardsBlock } from "../../content/featured_grid_home/GridCardsBlock";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    commentsSectionModel: CommentsSectionModel;
    quotesModel: QuoteHeaderModel[];
}
export const DetailBottomSection: React.FC<Props> = ({ quotesModel, commentsSectionModel, className, ...rest }) => {
    const divClass = classNames("flex flex-col gap-6 ", className);
    return (
        <ContentWrapper className={divClass} {...rest}>
            { quotesModel.length !== 0 &&
                <GridCardsBlock
                    features={quotesModel.map(t => ({ ...t, className: "col-span-2" }))}
                    className='grid-cols-2 md:grid-cols-4 lg:grid-cols-8'
                />
            }
            <GridComments
                items={commentsSectionModel.comments}
                forumTopicId={commentsSectionModel.forumTopicId}
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
