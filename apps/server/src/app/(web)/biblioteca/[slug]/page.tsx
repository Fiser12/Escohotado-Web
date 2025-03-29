"use server";

import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { Media, Taxonomy } from "payload-types";
import { BookVariantsSelector } from "@/modules/nuqs";
import { LexicalRenderer } from "@/modules/lexical/lexicalRenderer";
import { mapAnyToComment } from "hegel";
import { evalPermissionByRoleQuery } from "payload-access-control";
import "hegel";
import { mapQuoteCard } from "@/core/mappers/mapCards";
import { getAuthorFromTaxonomies } from "@/core/mappers/mapTaxonomyToCategoryModel";
import { COLLECTION_SLUG_BOOK } from '@/core/collectionsSlugs';
import { routes } from '@/core/routesGenerator';
import { DetailBottomSection } from '@/components/common/detail_bottom_section';
import { SEOContentWrapper } from '@/components/common/seo_content_wrapper';
import { BookDetail } from '@/components/content/pages/book_page/detail';

interface Props {
    params: {
        slug: string;
    };
}

const Page = async (props: Props) => {
    const payload = await getPayload();
    const { slug } = await props.params;

    const [user, books] = await Promise.all([
        getCurrentUserQuery(payload),
        payload.find({
            collection: COLLECTION_SLUG_BOOK,
            sort: "-publishedAt",
            where: {
                slug: { equals: slug }
            }
        })
    ]);
    const book = books.docs.at(0);
    const hasPermissions = evalPermissionByRoleQuery(user, 'basic');
    const variants: { [key: string]: string } = {
        book: "Libro",
        audiobook: "Audiolibro",
        ebook: "Ebook"
    };
    const options = book?.Ediciones?.map((edition) => ({
        label: variants[edition.variant ?? "book"] ?? "Libro",
        id: edition.variant ?? "",
        url: edition.link ?? "#"
    })) ?? [];
    if (!book) return <p>Error Cargando el documento</p>
    const cover = (book?.cover as Media | null)?.url ?? "#"

    return <SEOContentWrapper
        title={book?.title ?? "No title"}
        description={book?.description ?? ""}
        imageHref={cover}
        ogType="video"
    >
        <BookDetail
            title={book.title ?? "No title"}
            description={book.description ?? ""}
            detailHref={routes.nextJS.generateDetailHref({ collection: "book", value: book })}
            author={getAuthorFromTaxonomies(book.categories as Taxonomy[])?.singular_name}
            coverHref={(book.cover as Media)?.url ?? "#"}
            langs={['es', 'en']}
            bookButtons={<BookVariantsSelector options={options} />}
            link={book.Ediciones?.[0].link ?? "#"}
        >
            {book.content && <LexicalRenderer data={book.content} />}
            <DetailBottomSection
                quotesModel={[].mapNotNull(mapQuoteCard(user))}
                commentsSectionModel={mapAnyToComment(book.forum_post_id, book.last_forum_posts ?? [])}
            />
        </BookDetail>
    </SEOContentWrapper>
};

export default Page;

