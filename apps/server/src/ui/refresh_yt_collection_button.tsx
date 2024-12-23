import syncYoutubeChannelToVideoCollection from "@/core/admin/youtube_importer/sync_youtube_channel_to_video_collection_command";
import { AdminViewProps } from "payload";

const refreshYtCollectionButton: React.FC<AdminViewProps> = async () => {

    return (
        <form action={syncYoutubeChannelToVideoCollection}>
            <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                <span className="btn__label">Sincronizar con YouTube</span>
            </button>
        </form>
    );
}

export default refreshYtCollectionButton;