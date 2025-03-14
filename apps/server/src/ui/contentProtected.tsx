"use server";

import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { evalPermissionByRoleQuery } from "@/core/auth/permissions/evalPermissionByRoleQuery";
import { permissionSlugs } from "hegel";

interface Props {
    fallback?: React.ReactNode;
    children?: React.ReactNode;
    permissions_seeds?: string | null;
}

export const ContentProtected: React.FC<Props> = async ({ children, fallback, permissions_seeds }) => {
    const user = await getCurrentUserQuery();
    if (!user) return fallback;
    //if (user.roles?.includes(permissionSlugs.webAdmin)) return children;
    const hasPermissions = evalPermissionByRoleQuery(user, permissions_seeds);
    if (hasPermissions) return children;
    return fallback;
}