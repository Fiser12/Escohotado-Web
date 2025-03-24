"use server";

import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { evalPermissionByRoleQuery } from "payload-access-control";

interface Props {
    fallback?: React.ReactNode;
    children?: React.ReactNode;
    permissions_seeds?: string | null;
}

export const ContentProtected: React.FC<Props> = async ({ children, fallback, permissions_seeds }) => {
    const user = await getCurrentUserQuery();
    if (!user) return fallback;

    const hasPermissions = evalPermissionByRoleQuery(user, permissions_seeds);
    if (hasPermissions) return children;
    return fallback;
}