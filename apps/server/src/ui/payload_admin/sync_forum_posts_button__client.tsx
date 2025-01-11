"use client";

import React, { useState } from "react";
import { syncForumPosts } from "./actions";
import { CollectionSlug } from "payload";

const SyncForumPostButton: React.FC<{ collectionSlug: CollectionSlug }> = ({ collectionSlug }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSync = async () => {
        setIsLoading(true);
        try {
            await syncForumPosts(collectionSlug);
            window.location.reload();
        } catch (error) {
            console.error("Error syncing forum posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSync}
            className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
            disabled={isLoading}
        >
            <span className="btn__label">
                {isLoading ? "Actualizando..." : "Actualizar posts"}
            </span>
        </button>
    );
};

export default SyncForumPostButton;
