import { MainButton } from "../../main_button/main_button";
import { ENFlag } from "./EN";
import { ESFlag } from "./ES";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    locale: string;
}

export const Flag: React.FC<Props> = ({ locale, className }) => {
    if(locale == "es") return <ESFlag className={className} />
    if(locale == "en") return <ENFlag className={className} />
    return <p>Flag not found</p>
}

export const FlagWithLabels: React.FC<Props> = ({ locale }) => {
    return (
        <MainButton 
            type={"line"}
            className="flex gap-2" 
            text={locale == "en" ? "Read in English" : "Leer en Español"}
            icon={<Flag locale={locale} />}
        />
    )
}