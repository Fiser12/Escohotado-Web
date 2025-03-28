import { MenuSection } from "hegel";
import { BaseUser } from "payload-access-control";

export const mockUser: BaseUser = {
    id: "123",
    name: "name",
    email: "email@fake.com",
    image: "https://fake.com/image.jpg",
    roles: []
}
export const mockAdminUser: BaseUser = {
    id: "123",
    name: "name",
    email: "email@fake.com",
    image: "https://fake.com/image.jpg",
    roles: ["webAdmin"]
}

export function menuSectionsLoaderMock(user: BaseUser): MenuSection[] {
    if(!user) {
        return [];
    }
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: "relativeUrls.user.profile" },
                { text: "Suscripción", href: "relativeUrls.subscriptions.list" }
            ]   
        }
    ];
    if(user.roles?.includes("webAdmin")) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Usuarios", href: "relativeUrls.admin.users" },
                { text: "Contenido", href: "relativeUrls.admin.content.root" },
            ]
        });
    }
    return sections;
}