import { COLLECTION_SLUG_ARTICLE_PDF } from "@/core/infrastructure/payload/collections/config";
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, ArticleCard, ContentGridList, EscohotadoArticlesPortada, handwrittenBackground, HeadlineCard, HighlightSection, CarouselBook } from "gaudi/server";
import { ArticlePdf, ArticleWeb, Media, Taxonomy } from "payload-types";
import { createSearchParamsCache, parseAsString } from "nuqs/server";
import { AutorBarSSR } from "@/ui/autor_bar_ssr";
import { MedioBarSSR } from "@/ui/medio_bar_ssr";
import { PaginationBarNuqs } from "@/ui/pagination_bar_nuqs";
import { SearchBarNuqs } from "@/ui/search_bar_nuqs";
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";
import { getArticlesQuery } from "@/core/content/getArticlesQuery";

export const pageSize = 10;

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

export const ArticlePage = async ({ searchParams }: Props) => {
  const { autor, medio, page, query } = await searchContentParamsCache.parse(searchParams)
  const payload = await getPayload();
  const user = await getCurrentUserQuery(payload);
  const medioArray = medio.split(',').filter(Boolean)
  const articles = await getArticlesQuery(query, autor, medioArray, parseInt(page) - 1)

  const booksExample = [
    { title: 'La conciencia infeliz', coverHref: 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', link: '/book1' },
    { title: 'El espíritu de la comedia', coverHref: 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', link: '/book2' },
    { title: 'De Physis a Polis', coverHref: 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', link: '/book3' },
    { title: 'Majestades, crímenes y víctimas', coverHref: 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', link: '/book4' },
    { title: 'Realidad y substancia', coverHref: 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', link: '/book5' },
    { title: 'La conciencia infeliz', coverHref: 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', link: '/book6' },
    { title: 'El espíritu de la comedia', coverHref: 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', link: '/book7' },
    { title: 'De Physis a Polis', coverHref: 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', link: '/book8' },
    { title: 'Majestades, crímenes y víctimas', coverHref: 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', link: '/book9' },
    { title: 'Realidad y substancia', coverHref: 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', link: '/book10' },
  ];

  return (
    <div className="w-full bg-gray-light">
      <div id="headerArticles" className="@container w-full bg-white pt-12.5">
        <ContentWrapper className="mx-auto flex flex-col gap-7.5">
          <H2 label="Últimos artículos"></H2>
          <div className="grid grid-cols-3 @max-md:grid-cols-1 items-center gap-4 md:gap-10">
            <EscohotadoArticlesPortada />
            <div className="w-full col-span-2 order-1 md:order-none">
              <HeadlineCard author="Daniel Pedrero Rodríguez" href="#" title="Más de 700 días sin la figura de Antonio Escohotado" textLink="Leer más"></HeadlineCard>
              <HeadlineCard author="Juan Manuel Ortiz" href="#" title="A propósito de la vigencia actual de «El espíritu de la comedia», ensayo de Antonio Escohotado" textLink="Leer más"></HeadlineCard>
              <HeadlineCard author="Héctor López" href="#" title="Una noche con Antonio" textLink="Leer más"></HeadlineCard>
            </div>
          </div>
        </ContentWrapper>
      </div>
      <HighlightSection description="¿Te gustaría pasear por la biblioteca de artículos personales de Escohotado?" textButton="Accede al contenido completo" href="#" coverHref={handwrittenBackground.src}></HighlightSection>
      <div className="@container w-full pt-12.5">
        <CarouselBook books={booksExample} />
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

