import { MainHero } from "../../../common/hero";
import { ContentWrapper } from "../../../../common/content_wrapper/content_wrapper";
import { ImageParallax } from "../../../book/cards/image_parallax";
import Image from "next/image";
import "../../article_page/detalle_web/article-html-content.css";
import { GridComments } from "../../../../common/comments/grid_comments";
import { Comment } from "../../../../common/comments";

interface Props {
    title: string;
    coverHref: string;
    description: string;
    langs: ('es' | 'en')[];
    link: string;
    bookButtons: React.ReactNode;
    children: React.ReactNode;
}

export const BookDetail = (props: Props) => {

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

    return (
        <div className="w-full bg-white">
            <MainHero
                topHeader={true}
                title={props.title}
                description={props.description}
                children={props.bookButtons}
                image={
                    <ImageParallax className="relative h-[280px] w-[180px] min-[469px]:w-[366px] min-[469px]:h-[550px] my-6" shadow={false}>
                        <Image
                            fill
                            src={props.coverHref}
                            alt={props.title}
                            className="object-cover"
                        />
                    </ImageParallax>
                }
            />
            {props.children}
            <ContentWrapper className="flex flex-col gap-12 pt-10">
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