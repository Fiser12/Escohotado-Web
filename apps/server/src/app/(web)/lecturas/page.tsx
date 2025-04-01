import { ArticlePageList } from "@/components/pages/article_page/list";
import { getArticlesQueryByTagsWithCache } from "@/core/queries/get-articles-query";
import { getBooksQueryWithCache } from "@/core/queries/get-books-query";
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { tagsFromContentQueryWithCache } from "@/core/queries/tags-from-content-query";
import { servicesProd } from "@/modules/services";
import { getPayload } from "@/payload/utils/get-payload";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
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
    taxonomies,
    articulosDataPage
  ] = await Promise.all([
    getCurrentUserQuery(),
    getArticlesQueryByTagsWithCache(query, tagsArrays, 0),
    getArticlesQueryByTagsWithCache("", [], 0, 4),
    getBooksQueryWithCache(),
    tagsFromContentQueryWithCache("article_web", query, ["autor", "revisar"]),
    payload.findGlobal({ slug: "articulos_page" })
  ]);

  return (
    <ArticlePageList
      user={user}
      articlesDataPage={articulosDataPage}
      articlesResult={articles}
      lastArticles={lastArticles.results}
      books={books}
      taxonomies={taxonomies}
      tags={tagsArrays}
      query={query}
      services={servicesProd}
    />
  );
};

export default ArticlePage;

