import { relativeUrls } from "./routing.js";
import type { UserModel, MenuSection } from "gaudi";
import { signOut } from '@auth/sveltekit/client';

export const accountMenuBuilder: (user: UserModel) => [MenuSection] = (user) => {
    let sections: MenuSection[] = [
        {
            items: [
                { text: "Cuenta", href: relativeUrls.user.profile },
                { text: "Suscripción", href: relativeUrls.subscriptions.list }
            ]   
        }
    ];
    if(user.roles.includes("admin")) {
        sections.push({
            title: "Administración",
            items: [
                { text: "Usuarios", href: relativeUrls.admin.users },
                { text: "Contenido", href: relativeUrls.admin.content.root },
            ]
        });
    }
    sections.push({
        items: [
            { text: "Cerrar sessión", action: signOut }
        ]
    });
    return sections as [MenuSection];
}