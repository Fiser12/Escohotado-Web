import type { Optional } from "./optional_helpers.js";

export type MenuItem = {
    text: string;
    action?: (() => void);
    href?: string;
    icon?: string;
}

export type MenuSection = {
    title?: Optional<string>;
    items: MenuItem[];
}
