import { COLLECTION_SLUG_BOOK } from "@/core/infrastructure/payload/collections/config";
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { ContentWrapper, H2, BookCard } from "gaudi/server";
import { ContentGridList } from "gaudi/server";
import { Media } from "payload-types";
export const pageSize = 10;

const Page = async () => {
  const payload = await getPayload();
  const [user, books] = await Promise.all([
    getCurrentUserQuery(payload),
    payload.find({
      collection: COLLECTION_SLUG_BOOK,
      sort: "-publishedAt"
    })
  ]);

  return (
    <ContentWrapper
      className="flex flex-col gap-y-5"
      backgroundClassname="bg-white"
    >
      <H2 label="Biblioteca" />
      <div>
        <ContentGridList
          items={books.docs}
          renderBox={(book, index) => (
            <BookCard
              key={index}
              title={book.title ?? "No title"}
              link={`/biblioteca/${book.slug}`}
              coverHref={(book.cover as Media).url ?? "#"}
            />
          )}
        />
      </div>
    </ContentWrapper>
  );
};

export default Page;

