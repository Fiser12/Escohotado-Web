import { ArticleWeb } from "payload-types";
import { postsArticle } from "./comments.model";
export const generateMockArticle = ({title, coverHref}: {title: string, coverHref?: string}): ArticleWeb => ({
    id: 1,
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [],
    cover: {
        id: 1,
        url: coverHref ?? "https://placehold.co/1200x600",
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    },
    forum_post_id: "1",
    last_forum_posts: postsArticle,
    publishedAt: new Date().toISOString(),
})

export const mockArticles = [
    {title: "Sample Article Title" },
    {title: "Sample Article Title 2" },
].map(generateMockArticle)