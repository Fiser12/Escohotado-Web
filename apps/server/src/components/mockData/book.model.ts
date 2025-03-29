import { Book } from "payload-types";

export const generateMockBook = (title: string, coverHref: string, link: string): Book => ({
    id: 1,
    title,
    cover: { id: 1, url: coverHref, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
})
