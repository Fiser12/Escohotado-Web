import { COLLECTION_SLUG_BOOK } from "@/collections/config";
import { getCurrentUser, getPayload } from "@/utils/payload";
import { ContentWrapper, H2, BookCard } from "gaudi/server";
import { ContentGridList } from "gaudi/server";
import { Media } from "payload-types";
export const pageSize = 10;

const Page = async () => {
  const payload = await getPayload();
  const [user, books] = await Promise.all([
    getCurrentUser(payload),
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

