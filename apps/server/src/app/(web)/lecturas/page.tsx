import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { arrayToRecord, convertContentModelToCard } from "hegel";
import { ArticleWeb, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { getArticlesQueryByTagsWithCache } from "@/core/queries/getArticlesQuery";
import { getBooksQueryWithCache } from "@/core/queries/getBooksQuery";
import Image from "next/image";
import { mapArticleCard } from "@/core/mappers/mapCards";
import { getPayload } from "@/payload/utils/getPayload";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexicalRenderer";
import classNames from "classnames";
import { getAuthorFromTaxonomies } from "@/core/mappers/mapTaxonomyToCategoryModel";
import { generateDetailHref, routes } from "@/core/routesGenerator";
import { ContentProtected } from "payload-access-control";
import { DynamicLoadingArticles } from "@/modules/dynamic-loading-lists/dynamic-loading-articles";
import { escohotadoArticlesPortada } from "@/components/assets";
import { ContentWrapper } from "@/components/layout/content_wrapper/content_wrapper";
import { HeadlineCard } from "@/components/organisms/details/article/cards/article_headline_card";
import { FreemiumHighlightSection } from "@/components/organisms/details/article/highlight/section_highlight";
import { CarouselBook } from "@/components/organisms/details/book/carousel";
import { GridCards } from "@/components/organisms/lexical/grid_cards/GridCards";
import { tagsFromContentQueryWithCache } from "@/core/queries/tagsFromContentQuery";
import { LecturasFilterBar } from "@/modules/nuqs";
import { Typo } from "@/components/atoms/typographies/Typographies";
import { servicesProd } from "@/modules/services";
import { ArticlePageList } from "@/components/pages/article_page/list";
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

