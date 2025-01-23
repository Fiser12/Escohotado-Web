'use client';
import { notNull } from "hegel";
import { Subscription, calculateButtonActionType } from "./subscriptions_card_group";
import { MainButton } from "../common/main_button/main_button";

interface Props {
    href: string;
    subscription?: Subscription;
    currentPriceId: string;
}
export const SubscriptionButton: React.FC<Props> = ({
    currentPriceId, subscription, href
}) => {
    const buttonAction = calculateButtonActionType(currentPriceId, subscription);
    const canceledDate = notNull(subscription?.canceledAt, (cancelAt) => new Date(cancelAt));

    if (buttonAction === "cancel") return <a href={href}><MainButton text="Cancelar" /></a>;
    else if (buttonAction === "change") return <a href={href}><MainButton text="Cambiar de plan" /></a>;
    else if (buttonAction === "select") return <a href={href}><MainButton text="Elegir" /></a>;
    else if (buttonAction === "renew") return <>
        <a href={href}><MainButton text="Renovar" /></a>
        {canceledDate && <p>La suscripción se cancelará el {canceledDate.toLocaleDateString()}</p>}
    </>;

    return <p>Error</p>;
};
