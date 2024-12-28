import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB } from "@/core/infrastructure/payload/collections/config";
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, ArticleCard } from "gaudi/server";
import { ArticlePdf, ArticleWeb, Media, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { AutorBarSSR } from "@/ui/autor_bar_ssr";
import { MedioBarSSR } from "@/ui/medio_bar_ssr";
import { PaginationBarNuqs } from "@/ui/pagination_bar_nuqs";
import { ContentGridList } from "gaudi/server";
import { SearchBarNuqs } from "@/ui/search_bar_nuqs";
export const pageSize = 10;
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";
import { getArticlesQuery } from "@/core/content/getArticlesQuery";

export const searchContentParamsCache = createSearchParamsCache({
  page: parseAsString.withDefault('1'),
  autor: parseAsString.withDefault(''),
  query: parseAsString.withDefault(''),
  medio: parseAsString.withDefault('')
})

type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string;
  url?: string | null
};
interface Props {
  searchParams: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const { autor, medio, page, query } = await searchContentParamsCache.parse(searchParams)
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  const medioArray = medio.split(',').filter(Boolean)
  const result = await getArticlesQuery(query, autor, medioArray, parseInt(page) - 1)

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5"
      backgroundClassname="bg-white"
    >
      <H2 label="Artículos" />
      <div className="flex flex-row gap-x-2">
        <AutorBarSSR />
        <MedioBarSSR />
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
              hasPermission={evalPermissionQuery(user, article.permissions_seeds?.trim() ?? "")}
            />
          )}
        />
      </div>
      <PaginationBarNuqs maxPage={result.maxPage} />
    </ContentWrapper>
  );
};

export default Page;

