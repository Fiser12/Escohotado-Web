import { updatePrices } from "@/core/infrastructure/payload/plugins/stripe/price";
import { updateProducts } from "@/core/infrastructure/payload/plugins/stripe/product";
import { EditViewProps } from "payload";

const updateProductsButton: React.FC<EditViewProps> = async (data: any) => {
    return (
        <form action={async () => {
            "use server";
            await updateProducts();
            await updatePrices();
        }}>
            <button type="submit" className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
                <span className="btn__label">Actualizar productos</span>
            </button>
        </form>
);
}

export default updateProductsButton;