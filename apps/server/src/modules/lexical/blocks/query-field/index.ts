import { Field } from "payload";
import { staticQueryBlock } from "./blocks/static-query-block";
import { articleQueryBlock } from "./blocks/article-query-block";
import { videoQueryBlock } from "./blocks/video-query-block";
import { quoteQueryBlock } from "./blocks/quote-query-block";
import { mediaQueryBlock } from "./blocks/media-query-block";

export const queryField: Field = {
    name: 'queryField',
    type: 'blocks',
    required: true,
    blocks: [
        staticQueryBlock,
        mediaQueryBlock,
        articleQueryBlock,
        videoQueryBlock,
        quoteQueryBlock
    ]
}