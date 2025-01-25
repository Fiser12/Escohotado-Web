"use server";

import { COLLECTION_SLUG_BOOK } from "@/payload/collections/config";
import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { BookDetail } from "gaudi/server";
import { Media } from "payload-types";
import { BookVariantsSelectorNuqs } from "@/ui/nuqs/book_variants_selector_nuqs";
import { LexicalRenderer } from "@/lexical/lexicalRenderer";

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
    const book = books.docs[0];
    const variants: { [key: string]: string } = {
        book: "Libro",
        audiobook: "Audiolibro",
        ebook: "Ebook"
    };
    const options = book.Ediciones?.map((edition) => ({
        label: variants[edition.variant ?? "book"] ?? "Libro",
        id: edition.variant ?? "",
        url: edition.link ?? "#"
    })) ?? [];
    return (
        <BookDetail
            title={book.title ?? "No title"}
            description={book.description ?? "Empty"}
            coverHref={(book.cover as Media)?.url ?? "#"}
            langs={['es', 'en']}
            bookButtons={<BookVariantsSelectorNuqs options={options} />}
            link={book.Ediciones?.[0].link ?? "#"}
            commentsSectionModel={{
                comments: [],
                forumTopicId: book.forum_post_id
            }}
        >
            { book.content && <LexicalRenderer data={book.content} /> }
        </BookDetail>
    );
};

export default Page;

