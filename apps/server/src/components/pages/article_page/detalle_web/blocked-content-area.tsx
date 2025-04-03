import { MainButtonActionProps } from "@/components/atoms/main-button";
import { HighlightCTASection, LockedHighlightSection, UnlocksDepletedHighlightSection } from "@/components/organisms/details/article/highlight";
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { ServiceInjector } from "@/modules/services";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { BaseUser } from "payload-access-control";
import { getNextUnlockDateQuery, countWeeklyUnlocksQuery, MAX_UNLOCKS_PER_WEEK} from "payload-stripe-inventory";
import { checkIfUserCanUnlockQuery } from "payload-stripe-inventory/server";

interface Props extends ServiceInjector {
    user?: BaseUser | null;
    data?: SerializedEditorState | null;
    permissions?: string[]

}
export const BlockedContentArea = ({
    user, data, services, permissions = []
}: Props) => {
    return <div className="flex flex-col">
        {data && <div className="relative w-full overflow-hidden">
            <div className="relative">
                <LexicalRenderer className="max-w-[48rem] mx-auto" data={data} services={services} />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        </div>}
        {(!user || !checkIfUserCanUnlockQuery(user, permissions)) ?
            <LockedHighlightSection /> :
            <UnlockableHighlightSection user={user} services={services} />}
    </div>;
};

export const UnlockableHighlightSection: React.FC<Props> = ({ user, services, permissions }) => {
    if (!user) return null;
    const restOfWeeklyUnlocks = MAX_UNLOCKS_PER_WEEK - countWeeklyUnlocksQuery(user)
    if (restOfWeeklyUnlocks === 0) return <UnlocksDepletedHighlightSection nextUnlockDate={getNextUnlockDateQuery(user)} />
    const unlockButton: MainButtonActionProps = {
        text: `Desbloquear`,
        color: "secondary",
        onClick: async () => {
            "use server";
        }
    }
    return <HighlightCTASection
        title={`Puedes desbloquear ${restOfWeeklyUnlocks} contenidos más esta semana`}
        buttons={[unlockButton]}
    />
}