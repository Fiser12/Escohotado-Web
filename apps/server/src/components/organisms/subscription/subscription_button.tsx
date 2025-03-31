'use client';
import { notNull } from "hegel";
import { calculateButtonActionType } from "./subscriptions_card_group";
import { MainButton } from "@/components/atoms/main_button/main_button";
import { SubscriptionInventory } from "payload-access-control";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string;
    signIn: () => Promise<void>;
    loggedIn: boolean;
    subscription?: SubscriptionInventory;
    currentPriceId: string;
}
export const SubscriptionButton: React.FC<Props> = ({
    currentPriceId, subscription, href, loggedIn, signIn, ...rest
}) => {
    const buttonAction = calculateButtonActionType(currentPriceId, subscription);
    const canceledDate = notNull(subscription?.subscriptionStripeData.canceledAt, (cancelAt) => new Date(cancelAt));
    if (!loggedIn) return <button onClick={signIn}><MainButton text="Elegir" /></button>;
    if (buttonAction === "cancel") return <a href={href} {...rest}><MainButton text="Cancelar" /></a>;
    else if (buttonAction === "change") return <a href={href} {...rest}><MainButton text="Cambiar de plan" /></a>;
    else if (buttonAction === "select") return <a href={href} {...rest}><MainButton text="Elegir" /></a>;
    else if (buttonAction === "renew") return <>
        <a href={href} {...rest}><MainButton text="Renovar" /></a>
        {canceledDate && <p>La suscripción se cancelará el {canceledDate.toLocaleDateString("es")}</p>}
    </>;

    return <p>Error</p>;
};
