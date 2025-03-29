import { Media } from "payload-types";

export const mockMedia: Media = {
    id: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    filename: "mock-media.jpg",
    filesize: 1000,
    width: 200,
    height: 307,
    url: "https://placehold.co/200x307",
}
