"use server";

import { EditViewProps, getPayload } from "payload";
import { updateProductsAndPrices } from "./actions";

export const UpdateProductsButton: React.FC<EditViewProps> = async (data: any) => {

    const payload = data.payload;
    const handleSubmit = async () => {
        "use server";
        //setIsLoading(true);
        try {
            await updateProductsAndPrices(payload);
            window.location.reload(); 
        } catch (error) {
            console.error("Error updating products and prices:", error);
        } finally {
            //setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleSubmit}
                className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
                //disabled={isLoading}
            >
                <span className="btn__label">
                    {true ? "Actualizando..." : "Actualizar productos"}
                </span>
            </button>
        </div>
    );
}
