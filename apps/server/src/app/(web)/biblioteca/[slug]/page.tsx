import { COLLECTION_SLUG_BOOK } from "@/core/infrastructure/payload/collections/config";
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper } from "gaudi/server";
import { BookDetail } from "gaudi/client";
import { Media } from "payload-types";
export const pageSize = 10;

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
        id: edition.variant ?? ""
    })) ?? [];
    return (
        <ContentWrapper
            className="flex flex-col gap-y-5"
            backgroundClassname="bg-white"
        >
            <BookDetail
                title={book.title ?? "No title"}
                description={book.description ?? "Empty"}
                contentHtml={book.content_html ?? "<p>Empty</p>"}
                coverHref={(book.cover as Media)?.url ?? "#"}
                langs={['es', 'en']}
                options={options}
                link={book.Ediciones?.[0].link ?? "#"}
            />

        </ContentWrapper>
    );
};

export default Page;

