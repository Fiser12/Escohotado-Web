
export interface Comment {
    user: string;
    date: string;
    comment: string;
}

export interface CommentsSectionModel {
    comments: Comment[];
    forumTopicId?: string | null;
}