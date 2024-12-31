import { COLLECTION_SLUG_ARTICLE_PDF } from "@/core/infrastructure/payload/collections/config";
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, ArticleCard, ContentGridList, EscohotadoArticlesPortada, handwrittenBackground, HeadlineCard, HighlightSection, CarouselBook } from "gaudi/server";
import { Media, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { AutorBarSSR } from "@/ui/autor_bar_ssr";
import { MedioBarSSR } from "@/ui/medio_bar_ssr";
import { PaginationBarNuqs } from "@/ui/pagination_bar_nuqs";
import { SearchBarNuqs } from "@/ui/search_bar_nuqs";
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";
import { getArticlesQuery } from "@/core/content/getArticlesQuery";
import { getBooksQuery } from "@/core/content/getBooksQuery";
import { getLastArticlesQuery } from "@/core/content/getLastArticlesQuery";

export const pageSize = 10;

export const searchContentParamsCache = createSearchParamsCache({
  page: parseAsString.withDefault('1'),
  autor: parseAsString.withDefault(''),
  query: parseAsString.withDefault(''),
  medio: parseAsString.withDefault('')
})

interface Props {
  searchParams: Record<string, string>;
}

export const ArticlePage = async ({ searchParams }: Props) => {
  const { autor, medio, page, query } = await searchContentParamsCache.parse(searchParams)
  const medioArray = medio.split(',').filter(Boolean)

  const user = await getCurrentUserQuery();
  const articles = await getArticlesQuery(query, autor, medioArray, parseInt(page) - 1)
  const lastArticles = await getLastArticlesQuery();
  const books = await getBooksQuery(query, 0)

  return (
    <div className="w-full bg-gray-light">
      <div id="headerArticles" className="@container w-full bg-white pt-12.5">
        <ContentWrapper className="mx-auto flex flex-col gap-7.5">
          <H2 label="Últimos artículos"></H2>
          <div className="grid grid-cols-3 @max-md:grid-cols-1 items-center gap-4 md:gap-10">
            <EscohotadoArticlesPortada />
            <div className="w-full col-span-2 order-1 md:order-none">
            { lastArticles.map((article, index) => {
              const categories = article.categories as Taxonomy[]
              const authorName = categories?.find(category => category.seed?.includes("autor") == true)?.singular_name ?? "No author"
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
      <HighlightSection description="¿Te gustaría pasear por la biblioteca de artículos personales de Escohotado?" textButton="Accede al contenido completo" href="#" coverHref={handwrittenBackground.src}></HighlightSection>
      <div className="@container w-full pt-12.5">
        <CarouselBook books={books} />
        <ContentWrapper className="mx-auto flex flex-col gap-7.5 pb-16">
          <H2 label="Artículos"></H2>
          <div className="flex gap-3">
            <AutorBarSSR />
            <MedioBarSSR />
            <SearchBarNuqs />
            </div>
          <ContentGridList
            items={articles.results}
            renderBox={(article, index) => (
              <ArticleCard
                key={index}
                title={article.title ?? "No title"}
                href={article.url ?? "#"}
                publishedAt={article.publishedAt as string}
                coverHref={(article.cover as Media | null)?.url ?? "#"}
                textLink={article.type === COLLECTION_SLUG_ARTICLE_PDF ? "Descargar" : "Leer más"}
                categories={article.categories as Taxonomy[]}
                hasPermission={evalPermissionQuery(user, article.permissions_seeds?.trim() ?? "")}
              />
            )}
            gridCols="md:grid-cols-2 lg:grid-cols-3"
            gap="gap-6"
          />
          <PaginationBarNuqs maxPage={articles.maxPage} />
        </ContentWrapper>
      </div>
    </div>
  );
};
export default ArticlePage;

