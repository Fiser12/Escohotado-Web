import { H2 } from "../../../common/headers/H2";
import { HeadlineCard } from "../cards/article_headline_card";
import { HighlightSection } from "../highlight/section_highlight";
import smokeEscohotado from "../../../assets/images/escohotado-articles-portada.png";
import handwrittingBg from "../../../assets/images/handwritting-bg.jpg";

export const ArticlePage = () => {
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
                    <div id="articleFilters" className="flex flex-row gap-2.5"></div>
                    <div id="articleContainer" className="w-full"></div>
                </div>
            </div>
        </div>
    );
};