import { NextPage } from "next";
import { getPayload } from '@/payload/utils/getPayload';
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
    return <ModalQuote quote={quote} />
}

export default Page;
