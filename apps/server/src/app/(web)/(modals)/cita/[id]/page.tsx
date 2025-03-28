import HomePage from "@/app/(web)/page";
import { NextPage } from "next";
import { getPayload } from "@/payload/utils/getPayload";
import { ModalQuoteLayout } from "@/modules/modal-layouts/ModalQuoteLayout";
import { routes } from "@/core/routesGenerator";
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
    <HomePage 
      action={routes.newsletter.newsletterSubscriptionForm}
    />
    <ModalQuoteLayout
      quote={quote}
      goBackTo={routes.nextJS.homePageHref}
    />
  </>
};

export default Page;