'use client';

import { FeedbackMessage } from '@/components/atoms/feedback-message';
import { MainButtonActionProps } from '@/components/atoms/main-button';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';
import { HighlightCTASection } from '..';
import { handleUnlockAction } from './handleUnlockAction';

interface UnlockActionHighlightSectionProps {
    restOfWeeklyUnlocks: number;
    collection: string;
    contentId: number;
}

export const UnlockActionHighlightSection: React.FC<UnlockActionHighlightSectionProps> = ({
    restOfWeeklyUnlocks,
    collection,
    contentId,
}) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(handleUnlockAction, null);

    React.useEffect(() => {
        if (state?.data) {
            router.refresh();
            window.scrollTo(0, 0);
        }
    }, [state, router]);

    const unlockButton: MainButtonActionProps = {
        text: isPending ? 'Desbloqueando...' : 'Desbloquear',
        color: "secondary",
        button: { type: 'submit' },
        type: 'fill',
        disabled: isPending || state?.data == true
    };

    return (
        <form action={formAction}>
            <input type="hidden" name="collection" value={collection} />
            <input type="hidden" name="contentId" value={contentId.toString()} />

            <HighlightCTASection
                title={`Puedes desbloquear ${restOfWeeklyUnlocks} contenidos más esta semana`}
                buttons={[unlockButton]}
            />

            {state?.error && (
                <div className="mt-4 text-center">
                    <FeedbackMessage type="error" message={state.error} />
                </div>
            )}
            {state?.data && (
                <div className="mt-4 text-center">
                    <FeedbackMessage type="success" message="¡Contenido desbloqueado con éxito!" />
                </div>
            )}
        </form>
    );
}; 