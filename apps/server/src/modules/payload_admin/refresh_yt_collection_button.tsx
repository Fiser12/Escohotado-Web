"use client";

import React, { useState } from "react";
import { syncNewVideos, syncAllVideos } from "./actions";

const RefreshYtCollectionButton: React.FC = () => {
    const [isLoadingNew, setIsLoadingNew] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);

    const handleSyncNew = async () => {
        setIsLoadingNew(true);
        try {
            await syncNewVideos();
            window.location.reload();
        } catch (error) {
            console.error("Error syncing new videos:", error);
        } finally {
            setIsLoadingNew(false);
        }
    };

    const handleSyncAll = async () => {
        setIsLoadingAll(true);
        try {
            await syncAllVideos();
            window.location.reload();
        } catch (error) {
            console.error("Error syncing all videos:", error);
        } finally {
            setIsLoadingAll(false);
        }
    };

    return (
        <li className="doc-controls__list-item doc-controls__value-wrap" style={{ gap: "0.6rem" }}>
            <p className="doc-controls__label">Sincronizar con YouTube:&nbsp;</p>
            <div>
                <button
                    type="button"
                    onClick={handleSyncNew}
                    className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
                    disabled={isLoadingNew}
                >
                    <span className="btn__label">
                        {isLoadingNew ? "Insertando nuevos..." : "Insertar nuevos"}
                    </span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleSyncAll}
                    className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
                    disabled={isLoadingAll}
                >
                    <span className="btn__label">
                        {isLoadingAll ? "Actualizando todos..." : "Actualizar todos"}
                    </span>
                </button>
            </div>
        </li>
    );
};

export default RefreshYtCollectionButton;
