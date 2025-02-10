"use server";

import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";
import { permissionSlugs } from "hegel";

interface Props {
    fallback?: React.ReactNode;
    children?: React.ReactNode;
}

export const ContentProtected: React.FC<Props> = async ({ children, fallback }) => {
    const user = await getCurrentUserQuery();
    if (!user) return fallback;
    if (user.roles?.includes(permissionSlugs.webAdmin)) return children;
    const hasPermissions = evalPermissionQuery(user, "basic");
    
    if (hasPermissions) return children;
    return fallback;
}