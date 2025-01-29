import { Field } from "payload";
import { staticQueryBlock } from "./blocks/static_query_block";
import { articleQueryBlock } from "./blocks/article_query_block";
import { videoQueryBlock } from "./blocks/video_query_block";
import { quoteQueryBlock } from "./blocks/quote_query_block";
import { mediaQueryBlock } from "./blocks/media_query_block";

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