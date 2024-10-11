import type { ContentCMSPrismaTyped } from "$src/lib/domain/cms/content-cms.js";
import type { VideoContentCMS } from "$src/lib/domain/cms/video-content-cms.js";
import { notNull } from "../../../../../../../packages/gaudi/src/domain/optional_helpers.js";
import { contentCMSTypes } from "$src/lib/domain/prisma-enum-mapping.js";
import { prismaClient } from "../../prisma/prisma_client.js";

export async function videoCmsList(page?: number, limit?: number): Promise<ContentCMSPrismaTyped<VideoContentCMS>[]> {
    limit = limit ?? 10;
    const skip = notNull(page, page => (page - 1) * limit);
    return await prismaClient.contentCMS.findMany({
        skip,
        take: limit,
        where: { type: contentCMSTypes.VIDEO },
        orderBy: { updatedAt: 'desc' }
    })
}

export async function getTotalVideos(): Promise<number> {
    return await prismaClient.contentCMS.count({
        where: { type: contentCMSTypes.VIDEO },
        orderBy: { updatedAt: 'desc' }
    })
}

