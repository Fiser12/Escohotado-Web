import syncForumWithDatabase from "@/core/admin/forum_sync";
import { EditViewProps } from "payload";

const validCollections = ["book", "video", "article_pdf", "article_web"];

const syncForumPostButton: React.FC<EditViewProps> = async (data: any) => {
    const collectionSlug = data?.params?.segments?.[1] ?? "book"
    return (
        <form action={async () => {
            "use server";
            syncForumWithDatabase(validCollections.includes(collectionSlug) ? collectionSlug : "book");
        }}>
            <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                <span className="btn__label">Actualizar posts</span>
            </button>
        </form>
);
}

export default syncForumPostButton;