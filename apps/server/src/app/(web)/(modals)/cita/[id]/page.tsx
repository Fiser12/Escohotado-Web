import HomePage from "@/app/(web)/page";
import { NextPage } from "next";
import QuoteModal from "@/app/(web)/@modal/(.)cita/[id]/page";
import { routes } from "hegel";
import { getPayload } from "@/payload/utils/getPayload";
import { ModalQuoteLayout } from "@/ui/modal-layouts/ModalQuoteLayout";
interface Props {
  params: {
    id: string;
  };
}

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = await params;
  const payload = await getPayload();
  const quote = await payload.findByID({
    collection: "quote",
    id,
  });

  return <>
    <HomePage />
    <ModalQuoteLayout
      quote={quote}
      goBackTo={routes.nextJS.homePageHref}
    />
  </>
};

export default Page;