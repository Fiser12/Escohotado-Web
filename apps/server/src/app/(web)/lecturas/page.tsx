import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { arrayToRecord, convertContentModelToCard } from "hegel";
import { ArticleWeb, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { getArticlesQueryByTagsWithCache } from "@/core/queries/getArticlesQuery";
import { getBooksQueryWithCache } from "@/core/queries/getBooksQuery";
import Image from "next/image";
import { mapArticleCard } from "@/core/mappers/mapCards";
import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/modules/lexical/lexicalRenderer";
import classNames from "classnames";
import { getAuthorFromTaxonomies } from "@/core/mappers/mapTaxonomyToCategoryModel";
import { generateDetailHref, routes } from "@/core/routesGenerator";
import { ContentProtected } from "payload-access-control";
import { DynamicLoadingArticles } from "@/modules/dynamic-loading-lists/dynamic-loading-articles";
import { escohotadoArticlesPortada } from "@/components/assets";
import { ContentWrapper } from "@/components/common/content_wrapper/content_wrapper";
import { H2 } from "@/components/common/headers/H2";
import { HeadlineCard } from "@/components/content/article/cards/article_headline_card";
import { FreemiumHighlightSection } from "@/components/content/article/highlight/section_highlight";
import { CarouselBook } from "@/components/content/book/carousel";
import { GridCardsBlock } from "@/components/content/featured_grid_home/GridCardsBlock";
import { tagsFromContentQueryWithCache } from "@/core/queries/tagsFromContentQuery";
import { LecturasFilterBar } from "@/modules/nuqs";
export const pageSize = 10;

export const searchContentParamsCache = createSearchParamsCache({
  tags: parseAsString.withDefault(''),
  query: parseAsString.withDefault(''),
})

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  searchParams: Record<string, string>;
}

export const ArticlePage = async ({ searchParams, className, ...rest }: Props) => {
  const { tags, query } = await searchContentParamsCache.parse(searchParams)
  const tagsArrays = tags.split(',').filter(Boolean)
  const payload = await getPayload()
  const [
    user,
    articles,
    lastArticles,
    books,
    articulosDataPage
  ] = await Promise.all([
    getCurrentUserQuery(),
    getArticlesQueryByTagsWithCache(query, tagsArrays, 0),
    getArticlesQueryByTagsWithCache("", [], 0, 4),
    getBooksQueryWithCache(),
    payload.findGlobal({ slug: "articulos_page" })
  ]);
  const taxonomies = await tagsFromContentQueryWithCache(
    "article_web", query, ["autor", "revisar"]
  );

  const articleCardMapper = (article: ArticleWeb) => mapArticleCard(user)(article);
  const divClass = classNames(
    "w-full bg-gray-light",
    className
  )
  return (
    <div className={divClass} {...rest}>
      <div id="headerArticles" className="@container w-full bg-white pt-12.5">
        <ContentWrapper className="mx-auto flex flex-col gap-7.5">
          <H2 label="Últimos artículos" id="last-articles" />
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 md:gap-10 items-end">
            <Image
              src={escohotadoArticlesPortada.src}
              alt="Escohotado image"
              className="order-2 lg:order-none w-[15rem] lg:w-auto mx-auto"
              width={650}
              height={1080}
            />
            <div className="w-full col-span-2 order-1 lg:order-none">
              {lastArticles.results.map((article, index) => {
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
        {({ hasPermissions }) => {
          return (
            <>
              {hasPermissions ?
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
              }
            </>
          )
        }}
      </ContentProtected>
      <CarouselBook books={books} title="Obras de Antonio Escohotado" />
      {articulosDataPage.content &&
        <LexicalRenderer data={articulosDataPage.content} />
      }
      <ContentWrapper className="mx-auto flex flex-col gap-7.5 pb-16">
        <H2 label="Artículos" id="h2-articles" />
        <LecturasFilterBar listOfTags={arrayToRecord(taxonomies, "slug")} />
        <GridCardsBlock
          features={
            articles.results
              .map(articleCardMapper)
              .map(convertContentModelToCard("col-span-2"))
          }
          className='grid-cols-2 md:grid-cols-4 lg:grid-cols-8'
        />
        <DynamicLoadingArticles
          user={user}
          tagsArrays={tagsArrays}
          query={query}
          maxPage={articles.maxPage}
        />
      </ContentWrapper>
    </div>
  );
};
export default ArticlePage;

