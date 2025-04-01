import { ModalQuote } from "@/components/organisms/modals/modal-quote/modalQuote";
import { getPayload } from '@/payload/utils/get-payload';
import { NextPage } from "next";

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
    return <ModalQuote quote={quote} />
}

export default Page;
