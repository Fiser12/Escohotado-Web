import React from "react";
import SyncForumPostButton from "./sync-forum-posts-button--client";

const SyncForumPostButtonAtVideo: React.FC = async (data: any) => {
    const collectionSlug = data?.params?.segments?.[1] ?? "book"
    return (
        <SyncForumPostButton collectionSlug={collectionSlug} />
    );
};

export default SyncForumPostButtonAtVideo;
