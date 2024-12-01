import classNames from "classnames";
import { H4 } from "../../../server";

interface Props {
    title: string;
    bookHref: string;
}

export const BookCard = (props: Props) => {
    const containerClass = classNames(
        'flex flex-col gap-5 max-w-[200px]'
    );

    return (
        <div className={containerClass}>
            <img
                src={props.bookHref}
                alt={props.title}
                className="max-h-[307px]"
            />
            <H4 label={props.title} className="line-clamp-3"></H4>
        </div>
    );
};
