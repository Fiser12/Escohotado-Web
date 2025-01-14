import syncYoutubeChannelToVideoCollection from "@/core/admin/youtube_importer/sync_youtube_channel_to_video_collection_command";
import { AdminViewProps } from "payload";

const refreshYtCollectionButton: React.FC<AdminViewProps> = async () => {

    return (
        <li className="doc-controls__list-item doc-controls__value-wrap" style={{gap: "0.6rem"}}>
            <p className="doc-controls__label">Sincronizar con YouTube:&nbsp;</p>
            <form action={async () => {
                "use server";
                syncYoutubeChannelToVideoCollection(false)
            }}>
                <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                    <span className="btn__label">Insertar nuevos</span>
                </button>
            </form>
            <form action={async () => {
                "use server";
                syncYoutubeChannelToVideoCollection(true)
            }}>
                <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                    <span className="btn__label">Actualizar todos</span>
                </button>
            </form>
        </li>
    );
}

export default refreshYtCollectionButton;