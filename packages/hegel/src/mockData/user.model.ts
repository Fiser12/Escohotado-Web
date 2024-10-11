import type { MenuSection } from "../domain/header_submenu_model.js";
import type { UserModel } from "../domain/user-model.js";

export const mockUser: UserModel = {
    userId: "123",
    name: "name",
    email: "email@fake.com",
    image: "https://fake.com/image.jpg",
    roles: []
}
export const mockAdminUser: UserModel = {
    userId: "123",
    name: "name",
    email: "email@fake.com",
    image: "https://fake.com/image.jpg",
    roles: ["admin"]
}

export function menuSectionsLoaderMock(user: UserModel): [MenuSection] {
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: "relativeUrls.user.profile" },
                { text: "Suscripción", href: "relativeUrls.subscriptions.list" }
            ]   
        }
    ];
    if(user.roles.includes("admin")) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Usuarios", href: "relativeUrls.admin.users" },
                { text: "Contenido", href: "relativeUrls.admin.content.root" },
            ]
        });
    }
    sections.push({
        items: [
            { text: "Cerrar sessión", href: "signOut" }
        ]
    });
    return sections as [MenuSection];
}