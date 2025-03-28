"use client";

import { EditViewProps } from "payload";
import { useState } from "react";
import { updateProductsAndPrices } from "../../server/actions/update-products-and-prices-action";
export const UpdateProductsButton: React.FC<EditViewProps> = (data: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await updateProductsAndPrices();
            window.location.reload(); 
        } catch (error) {
            console.error("Error updating products and prices:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleSubmit}
                className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
                disabled={isLoading}
            >
                <span className="btn__label">
                    {isLoading ? "Actualizando..." : "Actualizar productos"}
                </span>
            </button>
        </div>
    );
}
