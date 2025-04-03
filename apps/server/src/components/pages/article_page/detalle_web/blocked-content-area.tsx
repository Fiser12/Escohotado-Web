import { FreemiumHighlightSection } from "@/components/organisms/details/article/highlight/section_highlight";
import { routes } from "@/core/routes-generator";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { ServiceInjector } from "@/modules/services";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { BaseUser } from "payload-access-control";

interface Props extends ServiceInjector {
    user?: BaseUser | null;
    data?: SerializedEditorState | null;

}
export const BlockedContentArea = ({
    user, data, services
}: Props) => {
    return <div className="flex flex-col">
        {data &&
            <div className="relative w-full overflow-hidden">
                <div className="relative">
                    <LexicalRenderer className="max-w-[48rem] mx-auto" data={data} services={services} />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-b from-transparent to-white pointer-events-none" />
            </div>}
        <FreemiumHighlightSection
            href={routes.nextJS.subscriptionPageHref}
            title="¿Te gustaría acceder al contenido exclusivo de Escohotado?"
            buttonText="Accede al contenido completo" />
    </div>;
};
