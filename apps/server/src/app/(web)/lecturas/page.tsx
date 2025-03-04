import { COLLECTION_SLUG_ARTICLE_PDF, routes } from "hegel/payload";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, handwrittenBackground, HeadlineCard, CarouselBook, escohotadoArticlesPortada, MainButton } from "gaudi/server";
import { FreemiumHighlightSection, HighlightSection } from "gaudi/client";
import { convertContentModelToCard } from "hegel";
import { Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { SearchBarNuqs } from "@/ui/nuqs/search_bar_nuqs";
import { CommonArticle, getArticlesQueryByTags } from "@/core/content/getArticlesQuery";
import { getBooksQuery } from "@/core/content/getBooksQuery";
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
  const user = await getCurrentUserQuery();
  const articles = await getArticlesQueryByTags(query, tagsArrays, 0)
  const lastArticles = await getArticlesQueryByTags("", [], 0, 4);
  const books = await getBooksQuery(query)
  const payload = await getPayload()
  const articulosDataPage = await payload.findGlobal({
    slug: "articulos_page"
  })
  const articleCardMapper = (article: CommonArticle) => mapArticleCard(user)(article);
  const divClass = classNames(
    "w-full bg-gray-light",
    className
  )
  return (
    <div className={divClass} {...rest}>
      <div id="headerArticles" className="@container w-full bg-white pt-12.5">
        <ContentWrapper className="mx-auto flex flex-col gap-7.5">
          <H2 label="Últimos artículos" id="last-articles" />
          <div className="grid grid-cols-3 @max-md:grid-cols-1 items-center gap-4 md:gap-10">
            <Image
              src={escohotadoArticlesPortada.src}
              alt="Escohotado image"
              className="order-2 md:order-none"
              width={650}
              height={1080}
            />
            <div className="w-full col-span-2 order-1 md:order-none">
              {lastArticles.results.map((article, index) => {
                const categories = article.categories as Taxonomy[]
                const authorName = getAuthorFromTaxonomies(categories)?.singular_name ?? "No author"
                return <HeadlineCard
                  key={index}
                  author={authorName}
                  href="#"
                  title={article.title ?? "No title"}
                  textLink={article.type === COLLECTION_SLUG_ARTICLE_PDF ? "Descargar" : "Leer más"}
                />
              })
              }
            </div>
          </div>
        </ContentWrapper>
      </div>
      <ContentProtected 
        permissions_seeds={"basic"}
        fallback={<FreemiumHighlightSection/>}
      >
        <HighlightSection description="Accede a las citas de Escohotado" coverHref={handwrittenBackground.src}>
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
            collection={['article_web', 'article_pdf']}
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

