type NavItemArgs = {
    href: string;
    text?: string;
    tabindex?: number;
};
export const NavItem = ({ href, text, tabindex }: NavItemArgs) => {
    return (
        <a
            tabIndex={tabindex}
            href={href}
            className="text-primary-900 text-sm font-normal font-body leading-none whitespace-nowrap shrink-0"
        >
            {text}
        </a>
    );
};
