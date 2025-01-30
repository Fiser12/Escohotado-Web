"use server";

import { COLLECTION_SLUG_BOOK, generateDetailHref } from "hegel/payload";
import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { BookDetail, DetailBottomSection } from "gaudi/server";
import { Media, Quote, Taxonomy } from "payload-types";
import { BookVariantsSelectorNuqs } from "@/ui/nuqs/book_variants_selector_nuqs";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";
import { mapAnyToComment } from "hegel";
import { getAuthorFromTaxonomies } from "@/core/content/taxonomiesGetters";
import { evalPermissionQuery } from "@/core/auth/permissions/evalPermissionQuery";
import "hegel";
import { mapQuoteCard } from "@/core/domain/mapping/mapCards";

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
    const hasPermissions = evalPermissionQuery(user, 'basic');
    const quotes = (book?.quotes?.docs ?? [])
        .slice(0, hasPermissions ? 3 : 0)
        .cast<Quote>()
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
    return (<BookDetail
        title={book.title ?? "No title"}
        description={book.description ?? "Empty"}
        detailHref={generateDetailHref({ collection: "book", value: book })}
        author={getAuthorFromTaxonomies(book.categories as Taxonomy[])?.singular_name}
        coverHref={(book.cover as Media)?.url ?? "#"}
        langs={['es', 'en']}
        bookButtons={<BookVariantsSelectorNuqs options={options} />}
        link={book.Ediciones?.[0].link ?? "#"}
    >
        {book.content && <LexicalRenderer data={book.content} />}
        <DetailBottomSection
            quotesModel={quotes.mapNotNull(mapQuoteCard(user))}
            commentsSectionModel={mapAnyToComment(book.forum_post_id, book.last_forum_posts ?? [])}
        />
    </BookDetail>
    );
};

export default Page;

