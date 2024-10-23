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
            className="text-black text-base font-normal font-montserrat leading-none whitespace-nowrap flex-shrink-0"
        >
            {text}
        </a>
    );
};
