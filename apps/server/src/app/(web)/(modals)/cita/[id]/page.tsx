import HomePage from "@/app/(web)/page";
import { NextPage } from "next";
import { getPayload } from "@/payload/utils/getPayload";
import { routes } from "@/core/routesGenerator";
import { ModalQuote } from "@/components/modals/modal-quote/modalQuote";

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
    <ModalQuote
      quote={quote}
      goBackTo={routes.nextJS.homePageHref}
    />
  </>
};

export default Page;