import { H2 } from "../../../../common/headers/H2";
import { HeadlineCard } from "../../cards/article_headline_card";
import { HighlightSection } from "../../highlight/section_highlight";
import smokeEscohotado from "../../../../assets/images/escohotado-articles-portada.png";
import handwrittingBg from "../../../../assets/images/handwritting-bg.jpg";
import { ContentGridList } from "../../../common/content_grid_list";
import { ArticleCard } from "../../cards/article_card";

export const ArticlePage = () => {

    const articles = [
        {
          title: "El impacto del prohibicionismo en la libertad individual",
          publishedAt: "2024-10-15T12:00:00Z",
          author: "Ana Pérez",
          textLink: "Leer artículo",
          coverHref: "https://via.placeholder.com/300?text=Prohibicionismo",
          href: "/article/prohibicionismo-libertad",
          categories: [
            { id: "1", singular_name: "Filosofía política" },
            { id: "2", singular_name: "Políticas de drogas" },
          ],
          hasPermission: true,
        },
        {
          title: "¿Es el uso de drogas una cuestión ética o política?",
          publishedAt: "2024-09-20T10:30:00Z",
          author: "Carlos Gómez",
          textLink: "Explorar más",
          coverHref: "https://via.placeholder.com/300?text=Ética+y+drogas",
          href: "/article/etica-y-politica-drogas",
          categories: [
            { id: "1", singular_name: "Ética" },
            { id: "2", singular_name: "Filosofía" },
          ],
          hasPermission: false,
        },
        {
          title: "Legalización y justicia social: un enfoque filosófico",
          publishedAt: "2024-08-05T08:00:00Z",
          author: "María López",
          textLink: "Ver detalles",
          coverHref: "https://via.placeholder.com/300?text=Justicia+Social",
          href: "/article/legalizacion-justicia",
          categories: [
            { id: "1", singular_name: "Justicia social" },
            { id: "2", singular_name: "Política" },
          ],
          hasPermission: true,
        },
      ];

    return (
        <div className="w-full bg-gray-light">
            <div id="headerArticles" className="@container w-full bg-white pt-12.5">
                <div className="@md:max-w-320 mx-auto flex flex-col gap-7.5">
                    <H2 label="Últimos artículos"></H2>
                    <div className="grid grid-cols-3 @max-md:grid-cols-1 items-center gap-10">
                        <img src={smokeEscohotado.src} alt="Escohotado image" />
                        <div className="w-full col-span-2">
                            <HeadlineCard author="Daniel Pedrero Rodríguez" href="#" title="Más de 700 días sin la figura de Antonio Escohotado" textLink="Leer más"></HeadlineCard>
                            <HeadlineCard author="Juan Manuel Ortiz" href="#" title="A propósito de la vigencia actual de «El espíritu de la comedia», ensayo de Antonio Escohotado" textLink="Leer más"></HeadlineCard>
                            <HeadlineCard author="Héctor López" href="#" title="Una noche con Antonio" textLink="Leer más"></HeadlineCard>
                        </div>
                    </div>
                </div>
            </div>
            <HighlightSection description="¿Te gustaría pasear por la biblioteca de artículos personales de Escohotado?" textButton="Accede al contenido completo" href="#" coverHref={handwrittingBg.src}></HighlightSection>
            <div className="@container w-full pt-12.5">
                <div className="@md:max-w-320 mx-auto flex flex-col gap-7.5">
                    <H2 label="Artículos"></H2>
                    <ContentGridList
                        items={articles}
                        renderBox={(article) => (
                            <ArticleCard
                                title={article.title}
                                publishedAt={article.publishedAt}
                                author={article.author}
                                textLink={article.textLink}
                                coverHref={article.coverHref}
                                href={article.href}
                                categories={article.categories}
                                hasPermission={article.hasPermission}
                            />
                        )}
                        gridCols="md:grid-cols-2 lg:grid-cols-3"
                        gap="gap-6"
                    />
                    <div id="articleContainer" className="w-full"></div>
                </div>
            </div>
        </div>
    );
};