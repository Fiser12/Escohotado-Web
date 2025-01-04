import syncForumWithDatabase from "@/core/admin/forum_sync";
import { EditViewProps } from "payload";

const syncForumPostButton: React.FC<EditViewProps> = async (data) => {
    return (
        <form action={async () => {
            "use server";
            syncForumWithDatabase("book")
        }}>
            <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                <span className="btn__label">Actualizar posts</span>
            </button>
        </form>
);
}

export default syncForumPostButton;