"use server";

import { updatePrices } from "@/core/infrastructure/payload/plugins/stripe/price";
import { updateProducts } from "@/core/infrastructure/payload/plugins/stripe/product";
import syncYoutubeChannelToVideoCollection from "@/core/admin/youtube_importer/sync_youtube_channel_to_video_collection_command";
import syncForumWithDatabase from "@/core/admin/forum_sync";
import { CollectionSlug } from "payload";

export async function syncForumPosts(collectionSlug: CollectionSlug) {
    const validCollections: CollectionSlug[] = ["book", "video", "article_pdf", "article_web"];
    const slug = validCollections.includes(collectionSlug as CollectionSlug) ? collectionSlug : "book";
    await syncForumWithDatabase(slug);
}

export async function updateProductsAndPrices() {
    await updateProducts();
    await updatePrices();
}


export async function syncNewVideos() {
    await syncYoutubeChannelToVideoCollection(false);
}

export async function syncAllVideos() {
    await syncYoutubeChannelToVideoCollection(true);
}
