"use server";

import { getPayload } from "@/payload/utils/getPayload";
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
export const updateSubscriptionStatus = async (isActive: boolean): Promise<boolean> => {
    try {
    const payload = await getPayload();
    const user = await getCurrentUserQuery(payload);
    if (!user) return false;
    await payload.update({
        collection: "users",
        id: user.id,
        data: {
            isSubscribedToNewsletter: isActive
        }
    })
    return true
    } catch (error) {
        return false
    }
}