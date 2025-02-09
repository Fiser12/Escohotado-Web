"use client";

import { mapTaxonomyToCategoryModel, getAuthorFromTaxonomies } from "@/core/domain/mapping/mapTaxonomyToCategoryModel";
import { Quote, Taxonomy } from "payload-types";
import { ModalQuote } from "gaudi/client";

export const ModalQuoteLayout: React.FC<{ goBackTo?: string, quote: Quote }> = ({ goBackTo, quote }) => {
    const taxonomies = quote.categories?.cast<Taxonomy>() ?? []
    
    return <ModalQuote
        goBackTo={goBackTo}
        quote={quote.quote}
        categories={taxonomies.map(mapTaxonomyToCategoryModel)}
        author={getAuthorFromTaxonomies(taxonomies)?.singular_name ?? ""}
    />
};
