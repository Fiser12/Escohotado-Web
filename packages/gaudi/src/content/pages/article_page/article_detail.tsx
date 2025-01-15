import classNames from "classnames";
import { H1 } from "../../../common/headers/H1";
import { H4 } from "../../../common/headers/H4";
import { ContentWrapper } from "../../../common/content_wrapper/content_wrapper";
import { Tag } from "../../../common/tag/tag";
import { GridComments } from "../../../common/comments/grid_comments";
import { Comment } from "../../../common/comments";
import "./article-html-content.css";

interface Props {
    title: string;
    publishedAt: string;
    author?: string;
    textLink: string;
    coverHref: string;
    href: string;
    categories: {
        id: string;
        singular_name: string;
        seed?: string | null
    }[];
    contentHtml: string;
}

export const ArticleDetail = (props: Props) => {

    const comments = [
        {
            user: "Juan Pérez",
            date: "2024-11-21",
            comment: "¡Excelente artículo! Muy informativo. Me gustó cómo abordaste el tema con tanta profundidad y claridad. Espero ver más contenido de este tipo en el futuro.",
          },
          {
            user: "María López",
            date: "2024-11-22",
            comment: "No estoy de acuerdo con algunos puntos mencionados, especialmente en lo que respecta a la interpretación de los datos. Sería interesante ver una comparación con otras fuentes para tener una perspectiva más completa.",
          },
          {
            user: "Carlos Sánchez",
            date: "2024-11-23",
            comment: "Gracias por compartir esta información. He estado investigando sobre este tema durante un tiempo y tus aportes me han ayudado a entender mejor los conceptos clave. ¡Sigue así!",
          },
          {
            user: "Lucía Gómez",
            date: "2024-11-24",
            comment: "Interesante perspectiva, lo consideraré en mis próximos proyectos. Me gustaría saber más sobre cómo aplicaste estas técnicas en casos reales. ¿Tienes ejemplos adicionales que puedas compartir?",
          },
    ];

    const containerClass = classNames(
        'bg-white text-black flex flex-col gap-12 md:gap-16'
    );

    const tagDateContainerClass = classNames(
        'flex flex-col md:flex-row gap-3 justify-between'
    );

    const categoriesClass = classNames(
        'flex flex-wrap gap-1'
    );
    const date = new Date(props.publishedAt);
    const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    });

    return (
        <div className={containerClass}>
            <img
                src={props.coverHref}
                alt={props.title}
                className="w-full object-cover h-[200px] md:h-[350px]"
            />
            <ContentWrapper className="flex flex-col gap-12">
                <div className="border-b-2 border-gray-light pb-9 md:pb-10 flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-2">
                        <H4 label={props.author ?? ""}></H4>
                        <H1 label={props.title ?? "No title"} />
                    </div>
                    <div className={tagDateContainerClass}>
                        <div className={categoriesClass}>
                            {props.categories?.map((category, index) =>
                                <Tag key={index} text={category.singular_name}></Tag>
                            )}
                        </div>
                        <p className="text-gray-disabled">{formattedDate}</p>
                    </div>
                </div>
                <div className="article-html-content" dangerouslySetInnerHTML={{ __html: props.contentHtml ?? "<p>Empty</p>" }} />
                <GridComments
                                    items={comments}
                                    renderBox={(comment) => (
                                        <Comment
                                            user={comment.user}
                                            date={comment.date}
                                            comment={comment.comment}
                                        />
                                    )}
                                />
            </ContentWrapper>
        </div>
    );
};
