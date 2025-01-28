export interface Comment {
  user: string;
  date: string;
  comment: string;
}

export interface CommentsSectionModel {
  comments: Comment[];
  forumTopicId?: string | null;
}

type CommentDTO = {
  userName: string;
  timestamp: number;
  content: string;
};

export const mapAnyToComment = (forumTopicId: string | undefined | null, post: any): CommentsSectionModel => {
  const opciones: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const comments = ((post ?? []) as CommentDTO[]).map(post => {
    return {
      user: post.userName,
      date: new Date(post.timestamp).toLocaleDateString("es-ES", opciones),
      comment: post.content,
    };
  });

  return {
    forumTopicId: forumTopicId,
    comments,
  };
};
