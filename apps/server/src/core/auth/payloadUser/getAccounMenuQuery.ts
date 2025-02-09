import { UserModel, MenuSection, routes, permissionSlugs } from "hegel";

export const getAccountMenuQuery: (user?: UserModel | null) => MenuSection[] = (user) => {
    if (!user) {
        return [];
    }
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: routes.accountPageHref },
                { text: "Suscripción", href: routes.subscriptionPageHref }
            ]   
        }
    ];
    if(user.roles.includes(permissionSlugs.webAdmin)) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Admin", href: "/admin" },
            ]
        });
    }
    return sections;
}