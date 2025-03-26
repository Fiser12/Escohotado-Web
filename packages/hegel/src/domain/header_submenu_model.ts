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

