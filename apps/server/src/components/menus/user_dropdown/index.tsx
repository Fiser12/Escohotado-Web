"use client";
import { useState } from "react";
import { MenuSection } from "hegel";
import classNames from "classnames";
import { motion } from "framer-motion";
import { BaseUser } from "payload-access-control";
import { BasicMenu } from "@/components/menus/basic_menu";
import { UserIcon, ChevronDownIcon } from "@/components/assets/icons";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    user: BaseUser
    menuSections: MenuSection[]
}

export const UserDropdown: React.FC<Props> = ({ user, menuSections, className, ...rest }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen((prevState) => !prevState);
    }
    const divClass = classNames(
        className,
        "relative inline-block"
    )

    return (
        <div className={divClass} {...rest}>
            <button onClick={toggleMenu}>
                <div className="flex items-center gap-1.5 h-16">
                    <span className="font-semibold font-body text-sm">{`Hola, ${user.name ?? user.email}`}</span>
                    <UserIcon color='primary' className="h-7" />
                        <motion.div
                            animate={{ scaleY: isMenuOpen ? -1 : 1 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ originY: 0.5, display: 'inline-block' }}
                        >
                            <ChevronDownIcon />
                        </motion.div>
                </div>
            </button>
            <motion.div 
                initial={{ height: 0 }}
                animate={{ height: isMenuOpen ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
                className={`absolute right-0 z-10 shadow-lg`}
                
            >
                <BasicMenu toggleMenu={setIsMenuOpen} menuSections={menuSections} />
            </motion.div>
        </div>
    );

};
