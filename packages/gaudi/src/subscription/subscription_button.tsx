'use client';
import { notNull } from "hegel";
import { EscotaButton } from "../common/escota_button/escota_button";
import { Subscription, calculateButtonActionType } from "./subscriptions_card_group";

interface Props {
    subscription?: Subscription;
    currentPriceId: string;
}
export const SubscriptionButton = ({
    currentPriceId, subscription
}: Props): JSX.Element => {
    const buttonAction = calculateButtonActionType(currentPriceId, subscription);
    const canceledDate = notNull(subscription?.canceled?.canceledAt, (cancelAt) => new Date(cancelAt * 1000));

    if (buttonAction === "cancel") return <EscotaButton text="Cancelar" />;
    else if (buttonAction === "change") return <EscotaButton text="Cambiar de plan" />;
    else if (buttonAction === "select") return <EscotaButton text="Elegir" />;
    else if (buttonAction === "renew") return <>
        <EscotaButton text="Renovar" />
        {canceledDate && <p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>}
    </>;

    return <p>Error</p>;
};
