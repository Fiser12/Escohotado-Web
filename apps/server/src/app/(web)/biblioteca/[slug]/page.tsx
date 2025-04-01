"use server";

import { getPayload } from '@/payload/utils/getPayload';
import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexicalRenderer";
import { COLLECTION_SLUG_BOOK } from '@/core/collectionsSlugs';
import { BookDetail } from '@/components/pages/book_page/detail';
import { servicesProd } from '@/modules/services';

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
            where: { slug: { equals: slug } }
        })
    ]);
    const book = books.docs.at(0);
    if (!book) return <p>Error Cargando el documento</p>

    return <BookDetail user={user} book={book} quotes={[]} services={servicesProd}/>
};

export default Page;

