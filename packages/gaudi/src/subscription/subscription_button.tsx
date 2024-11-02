'use client';
import { notNull } from "hegel";
import { EscotaButton } from "../common/escota_button/escota_button";
import { Subscription, calculateButtonActionType } from "./subscriptions_card_group";

interface Props {
    href: string;
    subscription?: Subscription;
    currentPriceId: string;
}
export const SubscriptionButton = ({
    currentPriceId, subscription, href
}: Props): JSX.Element => {
    const buttonAction = calculateButtonActionType(currentPriceId, subscription);
    const canceledDate = notNull(subscription?.canceledAt, (cancelAt) => new Date(cancelAt));

    if (buttonAction === "cancel") return <a href={href}><EscotaButton text="Cancelar" /></a>;
    else if (buttonAction === "change") return <a href={href}><EscotaButton text="Cambiar de plan" /></a>;
    else if (buttonAction === "select") return <a href={href}><EscotaButton text="Elegir" /></a>;
    else if (buttonAction === "renew") return <>
        <a href={href}><EscotaButton text="Renovar" /></a>
        {canceledDate && <p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>}
    </>;

    return <p>Error</p>;
};
