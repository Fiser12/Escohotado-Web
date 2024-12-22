import { COLLECTION_SLUG_VIDEO } from "@/core/infrastructure/payload/collections/config";
import { getPayload } from "@/core/infrastructure/payload/utils/getPayload";
import { payloadUpsert } from "@/core/infrastructure/payload/utils/upsert";
import { AdminViewProps } from "payload";

const refreshYtCollectionButton: React.FC<AdminViewProps> = async ({ clientConfig }) => {
    const url = "https://www.youtube.com/watch?v=-5UOhvziIW0";
    return (
        <form action={async () => {
            "use server";
            await payloadUpsert({
                collection: COLLECTION_SLUG_VIDEO,
                data: {
                    url
                },
                where: {
                    url: { equals: url },
                }
            })
        }}>
            <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                <span className="btn__label">
                    Sincronizar con YouTube
                </span>
            </button>
        </form>
    );
}

export default refreshYtCollectionButton;