"use client";

import { updateSubscriptionStatus } from "@/core/newsletter/updateSubscriptionStatus";
import { ToggleButtonGroup } from "gaudi/client";
import { startTransition, useOptimistic } from "react";

type NewsletterStatus = "active" | "inactive";

export const NewsletterToggleButton: React.FC<{newsletterIsActive: boolean}> = ({ newsletterIsActive }) => {
    const [user, updateUser] = useOptimistic<{ newsletter: NewsletterStatus }>({
        newsletter: newsletterIsActive ? "active" : "inactive"
    });
    const handleToggle = (option: string) => {
        const selectedId = option as NewsletterStatus;
        startTransition(async () => {
            updateUser((pendingState) => ({
                ...pendingState,
                newsletter: selectedId,
            }));
            const result = await updateSubscriptionStatus(selectedId === "active");
            if (!result) {
                updateUser((pendingState) => ({
                    ...pendingState,
                    newsletter: selectedId === "active" ? "inactive" : "active",
                }));
            }
    });

    };
    return (<div>
        <div>
            <ToggleButtonGroup
                selected={user.newsletter}
                options={[
                    { id: "active", label: "Activo" },
                    { id: "inactive", label: "Inactivo" },
                ]}
                setOption={handleToggle}
            />
        </div>
    </div>
    )

}