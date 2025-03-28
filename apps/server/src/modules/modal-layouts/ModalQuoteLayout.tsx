"use client";

import { mapTaxonomyToCategoryModel, getAuthorFromTaxonomies } from "@/core/mappers/mapTaxonomyToCategoryModel";
import { Quote, Taxonomy } from "payload-types";
import { ModalQuote } from "gaudi/client";
import { useRouter } from "next/navigation";

export const ModalQuoteLayout: React.FC<{ goBackTo?: string, quote: Quote }> = ({ goBackTo, quote }) => {
    const taxonomies = quote.categories?.cast<Taxonomy>() ?? []
    const router = useRouter();
    const onCloseModal = () => {
        if (goBackTo) router.push(goBackTo);
        else router.back();
    }

    return <ModalQuote
        goBackTo={goBackTo}
        quote={quote.quote}
        onCloseModal={onCloseModal}
        categories={taxonomies.map(mapTaxonomyToCategoryModel)}
        author={getAuthorFromTaxonomies(taxonomies)?.singular_name ?? ""}
    />
};
