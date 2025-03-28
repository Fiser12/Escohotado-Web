import { BaseUser, evalPermissionByRoleQuery, isContentUnlocked } from "..";


interface Props {
    user: BaseUser | null;
    collection: string;
    content: {
        id?: number;
        permissions_seeds?: string | null;
    }
    children: (props: ReturnType) => React.ReactNode;
}

type ReturnType = { 
    hasPermissions: boolean
    isUnlocked: boolean
 }

export const ContentProtected: React.FC<Props> = async ({ user, children, collection, content: { id, permissions_seeds } }) => {
    if (!user) return children({ hasPermissions: false, isUnlocked: false });

    const isUnlocked = user && id ? isContentUnlocked(user, id, collection) : false;
    const hasPermissions = evalPermissionByRoleQuery(user, permissions_seeds);

    return children({ hasPermissions, isUnlocked });
}
