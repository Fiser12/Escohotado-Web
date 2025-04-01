import Link from "next/link"
import { ButtonsBlock } from 'payload-types';
import React from "react"
import { MainButton } from "@/components/atoms/main_button/main_button"

export type ButtonsLexicalType = NonNullable<ButtonsBlock["buttons"]>;
export type ButtonLexicalType = ButtonsLexicalType[number];
export type ButtonColorType = ButtonLexicalType["type_of_button_style"];

export const LexicalButtonRenderer: React.FC<ButtonLexicalType> = (button) => {
    return <Link href={getHrefFromButton(button)}>
        <MainButton
            text={button?.label ?? ""}
            {...getStyles(button.type_of_button_style)}
        />
    </Link>
}
export const LexicalButtonsRenderer: React.FC<{
    buttons: ButtonsLexicalType
    alignment?: "right" | "left" | "center"
}> = ({ buttons, alignment = "center" }) => {
    let alignmentTailwind
    if (alignment === "right") alignmentTailwind = "md:justify-end"
    else if (alignment === "left") alignmentTailwind = "md:justify-start"
    else alignmentTailwind = "md:justify-center"

    return <div className={`flex flex-wrap gap-4 justify-center ${alignmentTailwind}`}>
        {buttons.map((button, index) => <LexicalButtonRenderer key={index} {...button} />)}
    </div>
}
type MainButtonStyles = {
    color: 'primary' | 'secondary',
    type: 'fill' | 'line'
}

const getStyles = (type: ButtonColorType): MainButtonStyles | undefined => {
    if (type == "primary_fill") return { color: 'primary', type: 'fill' }
    if (type == "secondary_fill") return { color: 'secondary', type: 'fill' }
    if (type == "primary_line") return { color: 'primary', type: 'line' }
    if (type == "secondary_line") return { color: 'secondary', type: 'line' }
}

const getHrefFromButton = (button: ButtonLexicalType): string => {
    if (button.type_of_button_link === "external") {
        return button.href ?? ""
    } else if (button.type_of_button_link === "collections") {
        if (typeof button.collections?.value === "number") {
            return "/"
        } else {
            return button.collections?.value.href ?? "/"
        }
    } else if (button.type_of_button_link === "static") {
        return button.static ?? ""
    }
    return "/"
}