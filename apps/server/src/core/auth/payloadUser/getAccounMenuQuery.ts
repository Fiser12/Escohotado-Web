import { UserModel, MenuSection, routes, permissionSlugs } from "hegel";

export const getAccountMenuQuery: (user?: UserModel | null) => MenuSection[] = (user) => {
    if (!user) { return []; }
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: routes.nextJS.accountPageHref },
                { text: "Suscripción", href: routes.nextJS.subscriptionPageHref }
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