import { UserModel, MenuSection, routes } from "hegel";

export const getAccountMenuQuery: (user?: UserModel | null) => MenuSection[] = (user) => {
    if (!user) {
        return [];
    }
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: "relativeUrls.user.profile" },
                { text: "Suscripción", href: routes.subscriptionPageHref }
            ]   
        }
    ];
    if(user.roles.includes("admin")) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Admin", href: "/admin" },
            ]
        });
    }
    return sections;
}