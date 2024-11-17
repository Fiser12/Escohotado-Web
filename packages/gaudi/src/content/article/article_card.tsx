import { H4 } from "gaudi";
import { MainButton } from "../../common/main_button/main_button";

interface Props {
    title: string;
    coverHref: string;
    href: string;
    buttonTitle: string;
    categories: { id: string; singular_name: string; }[];
    hasPermission: boolean;
}
export const ArticleCard = (props: Props) => {
    return (
        <div>
            <H4 label={props.title} />
            <img src={props.coverHref} alt={props.title} />
            <a href={props.href}>
                {props.hasPermission ? <MainButton text={props.buttonTitle} color="primary" /> : <p>No tienes permisos</p>}
            </a>
            <div>
                {props.categories?.map((category, index) => 
                <p
                    key={index}
                    className="my-2 block rounded bg-zinc-100 px-4 pb-2.5 pt-3 text-xs font-medium uppercase leading-tight text-neutral-500 data-[twe-nav-active]:!bg-primary-100 data-[twe-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white/50 dark:data-[twe-nav-active]:!bg-slate-900 dark:data-[twe-nav-active]:text-primary-500 md:me-4">
                        {category.singular_name}
                    </p>
                )}
            </div>
            <span></span>
        </div>
    );
};
