import { routes } from "../payload";
import type { Optional } from "./optional_helpers.js";

export type MenuItem = {
    text: string;
    action?: () => Promise<void>;
    tabindex?: number;
    href?: string;
    target?: "_black" | "_self" | "_parent" | "_top";
    icon?: string;
}

export type MenuSection = {
    title?: Optional<string>;
    items: MenuItem[];
}

export const navItemList: (hasPermission: Boolean) => MenuItem[] = (hasPermission) => {
    let items = [
        { href: routes.nextJS.lecturasPageHref, tabindex: 2, text: "Lecturas" },
        { href: routes.nextJS.videosPageHref, tabindex: 3, text: "Videos" },
        { href: routes.nodeBB.root, tabindex: 4, text: "Foro" },
    ]
    if (hasPermission) {
        items.push({
            href: routes.nextJS.citasPageHref,
            tabindex: 5,
            text: "Citas"
        })
    }
    return items
}

