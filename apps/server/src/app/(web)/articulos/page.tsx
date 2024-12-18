import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB } from "@/collections/config";
import { getCurrentUser, getPayload } from "@/utils/payload";
import { ContentWrapper, H2, ArticleCard } from "gaudi/server";
import { ArticlePdf, ArticleWeb, Media, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { AutorBarSSR } from "@/components/autor_bar_ssr";
import { TemaBarSSR } from "@/components/tema_bar_ssr";
import { PaginationBarNuqs } from "@/components/pagination_bar_nuqs";
import { ContentGridList } from "gaudi/server";
import { SearchBarNuqs } from "@/components/search_bar_nuqs";
export const pageSize = 10;
import { evalPermission } from "@/domain/eval_content_permissions";
import { getArticlesQuery } from "@/utils/payload/queries/getArticlesQuery";

export const searchContentParamsCache = createSearchParamsCache({
  page: parseAsString.withDefault('1'),
  autor: parseAsString.withDefault(''),
  query: parseAsString.withDefault(''),
  temas: parseAsString.withDefault('')
})

type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string;
  url?: string | null
};
interface Props {
  searchParams: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const { autor, temas, page, query } = await searchContentParamsCache.parse(searchParams)
  const payload = await getPayload();
  const user = await getCurrentUser(payload);
  const temasArray = temas.split(',').filter(Boolean)
  const result = await getArticlesQuery(query, autor, temasArray, parseInt(page) - 1)

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5"
      backgroundClassname="bg-white"
    >
      <H2 label="Artículos" />
      <div className="flex flex-row gap-x-2">
        <AutorBarSSR />
        <TemaBarSSR />
        <SearchBarNuqs />
      </div>
      <div>
        <ContentGridList
          items={result.results}
          renderBox={(article: CommonArticle, index) => (
            <ArticleCard
              key={index}
              title={article.title ?? "No title"}
              href={article.url ?? "#"}
              publishedAt={article.publishedAt as string}
              coverHref={(article.cover as Media | null)?.url ?? "#"}
              textLink={article.type === COLLECTION_SLUG_ARTICLE_PDF ? "Descargar" : "Leer más"}
              categories={article.categories as Taxonomy[]}
              hasPermission={evalPermission(user, article)}
            />
          )}
        />
      </div>
      <PaginationBarNuqs maxPage={result.maxPage} />
    </ContentWrapper>
  );
};

export default Page;

