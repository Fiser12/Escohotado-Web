import { UserModel, MenuSection } from "hegel";

export const accountMenuBuilder: (user?: UserModel | null) => MenuSection[] = (user) => {
    if (!user) {
        return [];
    }
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: "relativeUrls.user.profile" },
                { text: "Suscripción", href: "subscriptions" }
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