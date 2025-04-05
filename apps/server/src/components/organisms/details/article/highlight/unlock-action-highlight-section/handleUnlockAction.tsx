'use server';

import { getCurrentUserQuery } from '@/core/queries/get-current-user-query';
import { getPayload } from '@/payload/utils/get-payload';
import { Result } from 'hegel';
import { unlockItemForUser } from 'payload-stripe-inventory/server';

//SMELL: No he conseguido pasar los services aquí para conseguir el mock

export async function handleUnlockAction(
    prevState: Result<boolean> | null,
    formData: FormData): Promise<Result<boolean>> {
    "use server";
    const collection = formData.get("collection") as string;
    const contentId = parseInt(formData.get("contentId") as string, 10);

    if (!collection || isNaN(contentId)) {
        return { error: "Información inválida para desbloquear." };
    }

    return await unlockItemForUser(
        getPayload,
        getCurrentUserQuery,
        collection,
        contentId
    );
}
