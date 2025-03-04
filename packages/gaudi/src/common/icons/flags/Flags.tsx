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
        <div className="flex gap-2">
            { locale == "es" ? <p>Spanish</p> : <p>Inglés</p> }
            <Flag locale={locale} />
        </div>
    )
}