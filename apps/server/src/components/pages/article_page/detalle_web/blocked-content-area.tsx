import { LockedHighlightSection, UnlocksDepletedHighlightSection } from "@/components/organisms/details/article/highlight";
import { UnlockActionHighlightSection } from "@/components/organisms/details/article/highlight/unlock-action-highlight-section";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { ServiceInjector } from "@/modules/services";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { BaseUser } from "payload-access-control";
import { countWeeklyUnlocksQuery, getNextUnlockDateQuery, MAX_UNLOCKS_PER_WEEK } from "payload-stripe-inventory";
import { checkIfUserCanUnlockQuery } from "payload-stripe-inventory/server";

interface Props extends ServiceInjector {
    user?: BaseUser | null;
    data?: SerializedEditorState | null;
    collection: string;
    contentId: number;
    permissions?: string[];
}

export const BlockedContentArea = ({
    user, data, services, permissions = [], collection, contentId
}: Props) => {
    const canUserUnlock = user ? checkIfUserCanUnlockQuery(user, permissions) : false;
    const restOfWeeklyUnlocks = user ? MAX_UNLOCKS_PER_WEEK - countWeeklyUnlocksQuery(user) : 0;
    const hasDepletedUnlocks = user ? restOfWeeklyUnlocks <= 0 : false;
    const nextUnlockDate = user ? getNextUnlockDateQuery(user) : undefined;

    return (
        <div className="flex flex-col">
            {data && (
                <div className="relative w-full overflow-hidden">
                    <div className="relative">
                        <LexicalRenderer className="max-w-[48rem] mx-auto" data={data} services={services} />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-b from-transparent to-white pointer-events-none" />
                </div>
            )}
            {!canUserUnlock ? (
                <LockedHighlightSection />
            ) : hasDepletedUnlocks ? (
                nextUnlockDate ? (
                    <UnlocksDepletedHighlightSection nextUnlockDate={nextUnlockDate} />
                ) : (
                    <p className="text-center text-gray-500">Has agotado tus desbloqueos semanales.</p>
                )
            ) : (
                <UnlockActionHighlightSection
                    restOfWeeklyUnlocks={restOfWeeklyUnlocks}
                    collection={collection}
                    contentId={contentId}
                />
            )}
        </div>
    );
};