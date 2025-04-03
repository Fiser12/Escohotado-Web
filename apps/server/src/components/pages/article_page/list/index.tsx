import { escohotadoArticlesPortada } from "@/components/assets";
import { Typo } from '@/components/atoms/typographies';
import { ContentWrapper } from '@/components/layout/content-wrapper';
import { HeadlineCard } from "@/components/organisms/details/article/cards/article_headline_card";
import { FreemiumHighlightSection } from "@/components/organisms/details/article/highlight/section_highlight";
import { CarouselBook } from "@/components/organisms/details/book/carousel";
import { GridCards } from "@/components/organisms/lexical/grid_cards";
import { mapArticleCard } from "@/core/mappers/map-cards";
import { getAuthorFromTaxonomies } from "@/core/mappers/map-taxonomy-to-category-model";
import { ArticlesQueryResult } from "@/core/queries/get-articles-query";
import { generateDetailHref, routes } from "@/core/routes-generator";
import { DynamicLoadingArticles } from "@/modules/dynamic-loading-lists/dynamic-loading-articles";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { LecturasFilterBar } from "@/modules/nuqs";
import { Services } from '@/modules/services';
import classNames from "classnames";
import { arrayToRecord, CategoryModel, convertContentModelToCard } from "hegel";
import Image from "next/image";
import { BaseUser, ContentProtected } from "payload-access-control";
import { ArticleWeb, ArticulosPage, Book, Taxonomy } from "payload-types";

interface Props {
    user: BaseUser | null;
    articlesDataPage: ArticulosPage;
    articlesResult: ArticlesQueryResult;
    lastArticles: ArticleWeb[];
    books: Book[];
    taxonomies: CategoryModel[];
    query: string;
    tags: string[];
    services: Services;
    className?: string;
}

export const ArticlePageList = ({
    user,
    articlesDataPage,
    articlesResult,
    lastArticles,
    books,
    taxonomies,
    tags,
    query,
    services,
    className,
    ...rest
}: Props) => {
    const articleCardMapper = (article: ArticleWeb) => mapArticleCard(user)(article);
    const divClass = classNames("w-full bg-gray-light", className)

    return <div className={divClass} {...rest}>
        <div id="headerArticles" className="@container w-full bg-white pt-12.5">
            <ContentWrapper className="mx-auto flex flex-col gap-7.5">
                <Typo.H2 className='w-full'>Últimos artículos</Typo.H2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 md:gap-10 items-end">
                    <Image
                        src={escohotadoArticlesPortada.src}
                        alt="Escohotado image"
                        className="order-2 lg:order-none w-[15rem] lg:w-auto mx-auto"
                        width={650}
                        height={1080}
                    />
                    <div className="w-full col-span-2 order-1 lg:order-none">
                        {lastArticles.map((article, index) => {
                            const categories = article.categories?.cast<Taxonomy>() ?? []
                            const authorName = getAuthorFromTaxonomies(categories)?.singular_name ?? "No author"
                            return <HeadlineCard
                                key={index}
                                author={authorName}
                                href={generateDetailHref({
                                    collection: 'article_web',
                                    value: { id: article.id, slug: article.slug }
                                }
                                )}
                                title={article.title ?? "No title"}
                                textLink={"Leer más"}
                            />
                        })
                        }
                    </div>
                </div>
            </ContentWrapper>
        </div>
        <ContentProtected
            user={user}
            collection="article_web"
            content={{ permissions_seeds: "basic" }}
        >
            {({ hasPermissions }) => (
                <> {hasPermissions ?
                    <FreemiumHighlightSection
                        href={routes.nextJS.citasPageHref}
                        title="Accede a las citas de Escohotado"
                        buttonText="Ir a las citas"
                    />
                    : <FreemiumHighlightSection
                        href={routes.nextJS.subscriptionPageHref}
                        title="¿Te gustaría acceder al contenido exclusivo de Escohotado?"
                        buttonText="Accede al contenido completo"
                    />
                } </>
            )
            }
        </ContentProtected>
        <CarouselBook books={books} title="Obras de Antonio Escohotado" />
        <LexicalRenderer
            data={articlesDataPage.content}
            services={services}
        />
        <ContentWrapper className="mx-auto flex flex-col gap-7.5 pb-16">
            <Typo.H2 className='w-full'>Artículos</Typo.H2>
            <LecturasFilterBar listOfTags={arrayToRecord(taxonomies, "slug")} />
            <GridCards
                features={
                    articlesResult.results
                        .map(articleCardMapper)
                        .map(convertContentModelToCard("col-span-2"))
                }
                className='grid-cols-2 md:grid-cols-4 lg:grid-cols-8'
            />
            <DynamicLoadingArticles
                user={user}
                contentServices={services.content}
                tagsArrays={tags}
                query={query}
                maxPage={articlesResult.maxPage}
            />
        </ContentWrapper>
    </div>
};
