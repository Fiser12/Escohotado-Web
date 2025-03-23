import { routes } from "hegel/payload";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, handwrittenBackground, HeadlineCard, CarouselBook, escohotadoArticlesPortada, MainButton, H4 } from "gaudi/server";
import { FreemiumHighlightSection, HighlightSection } from "gaudi/client";
import { convertContentModelToCard } from "hegel";
import { ArticleWeb, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { SearchBarNuqs } from "@/ui/nuqs/search_bar_nuqs";
import { getArticlesQueryByTagsWithCache } from "@/core/content/getArticlesQuery";
import { getBooksQueryWithCache } from "@/core/content/getBooksQuery";
import Image from "next/image";
import { DynamicLoadingArticles } from "../../../ui/dynamic-loading-lists/dynamic-loading-articles";
import { mapArticleCard } from "@/core/domain/mapping/mapCards";
import { GridCardsBlock } from "node_modules/gaudi/src/content/featured_grid_home/GridCardsBlock";
import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import classNames from "classnames";
import { TagsFilterBarSSR } from "@/ui/nuqs/tags_filter_bar_ssr";
import { getAuthorFromTaxonomies } from "@/core/domain/mapping/mapTaxonomyToCategoryModel";
import { ContentProtected } from "@/ui/contentProtected";
import Link from "next/link";
import { generateDetailHref } from "node_modules/hegel/src/payload/routesGenerator";

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
        permissions_seeds={"basic"}
        fallback={<FreemiumHighlightSection />}
      >
        <HighlightSection>
          <H4 label="Accede a las citas de Escohotado" />
          <Link href={routes.nextJS.citasPageHref}>
            <MainButton text={"Ir a las citas"} color="secondary" type="line"></MainButton>
          </Link>
        </HighlightSection>
      </ContentProtected>
      <CarouselBook books={books} title="Obras de Antonio Escohotado" />
      {articulosDataPage.content &&
        <LexicalRenderer data={articulosDataPage.content} />
      }
      <ContentWrapper className="mx-auto flex flex-col gap-7.5 pb-16">
        <H2 label="Artículos" id="h2-articles" />
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <TagsFilterBarSSR
            collection={['article_web']}
            query={query}
            excludeSeeds={["autor", "revisar"]}
            title='Etiquetas'
            queryKey='tags'
          />
          <SearchBarNuqs />
        </div>
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

