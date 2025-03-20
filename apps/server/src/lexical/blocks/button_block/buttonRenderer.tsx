import Link from "next/link"
import { ButtonColorType, ButtonLexicalType } from "./buttonField"
import { MainButton } from "gaudi/server"
import React from "react"

export const LexicalButtonRenderer: React.FC<ButtonLexicalType> = (button) => {
    return <Link href={getHrefFromButton(button)}>
    <MainButton 
        text={button.label} 
        {...getStyles(button.type_of_button_style)}
    />
  </Link>
}
export const LexicalButtonsRenderer: React.FC<{
    buttons: ButtonLexicalType[]
    alignment: "right" | "left" | "center"
}> = ({buttons, alignment}) => {
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

const getStyles = (type: ButtonColorType): MainButtonStyles | undefined  => {
    if(type == "primary_fill") return {color: 'primary', type: 'fill'}
    if(type == "secondary_fill") return {color: 'secondary', type: 'fill'}
    if(type == "primary_line") return {color: 'primary', type: 'line'}
    if(type == "secondary_line") return {color: 'secondary', type: 'line'}
}

const getHrefFromButton = (button: ButtonLexicalType): string => {
    if(button.type_of_button_link === "external") {
        return button.href
    } else if(button.type_of_button_link === "collections") {
        return button.collections.value.href
    } else if(button.type_of_button_link === "static") {
        return button.static
    }
    return "/"
}