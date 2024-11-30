import { User, Subscription } from "payload-types";
import "hegel";

export const evalPermission = (user: User | null, content: { permissions_seeds?: string | null; }): boolean => {
    const userPermissions = user?.subscription?.docs
        ?.cast<Subscription>()
        ?.filter(subscription => subscription.status === 'active')
        ?.map(subscription => subscription.permissions_seeds)
        ?? [];
    const contentPermissions = content.permissions_seeds?.trim() ?? "";
    if (contentPermissions == "") return true;

    return userPermissions.some(permission => permission && contentPermissions.includes(permission));
};
