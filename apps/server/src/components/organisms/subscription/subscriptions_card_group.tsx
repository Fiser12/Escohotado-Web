'use client';

import React, { useState } from "react";
import { ToggleButtonGroup } from "@/components/molecules/toggle_button_group/toggle_button_group";
import { SubscriptionCard } from "./subscription_card";
import { Interval, IntervalOptions } from "hegel";
import { SubscriptionButton } from "./subscription_button";
import "hegel";
import { SubscriptionInventory } from "payload-access-control";

interface Price {
    id: number;
    currency: string;
    unitAmount: number;
    stripeID: string;
    interval?: Interval | null;
}
interface Product {
    id: number;
    name: string;
    features?:
    | {
        title?: string | null;
        id?: string | null;
    }[]
    | null;
    metadata?: any;
    prices?: (number | Price)[] | null;
}

export enum SubscriptionButtonActionType {
    cancel = 'cancel',
    renew = 'renew',
    change = 'change',
    select = 'select'
}
const defaultOptions: IntervalOptions[] = [
    { id: 'month', label: 'Pago mensual' },
    { id: 'year', label: 'Pago anual', sublabel: 'ahorra 10%' }
];

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    products: Product[];
    signIn: () => Promise<void>;
    loggedIn: boolean;
    subscription?: SubscriptionInventory;
    options?: IntervalOptions[];
}

export const SubscriptionsGroupCard: React.FC<Props> = ({
    products,
    signIn,
    subscription,
    loggedIn,
    options = defaultOptions,
    ...rest
}) => {
    const [selected, setSelected] = useState(options[0]!.id);

    return (
        <>
            <ToggleButtonGroup options={options} selected={selected!} setOption={setSelected as () => void} />
            <div className="h-96 justify-start items-start gap-7 inline-flex" {...rest}>
                {products
                    .mapNotNull((product) => {
                        const price = getPriceByProduct(product, selected);
                        return price ? { product, price } : null;
                    })
                    .map(({ product, price }) => (
                        <SubscriptionCard
                            key={product.id}
                            title={product.name}
                            interval={price.interval ?? 'month'}
                            price={`${price.unitAmount / 100} ${price.currency}`}
                            features={product.features?.mapNotNull((feature) => feature.title) ?? []}
                            mainCard={product.metadata?.prominent === 'true'}
                        >
                            <SubscriptionButton
                                signIn={signIn}
                                loggedIn={loggedIn}
                                href={subscriptionButtonHref(
                                    calculateButtonActionType(price.stripeID, subscription),
                                    price.stripeID,
                                    subscription?.stripeData.subscriptionId
                                )}
                                subscription={subscription}
                                currentPriceId={price.stripeID}
                            />
                        </SubscriptionCard>
                    ))}
            </div>
        </>
    );
};

const subscriptionButtonHref: (action: SubscriptionButtonActionType, priceId: string, subscriptionId?: string) => string = (action, priceId, subscriptionId) => {
    if (action === 'cancel') return `/api/stripe-inventory/update?subscriptionId=${subscriptionId}&cancelAtPeriodEnd=true`
    else if (action === 'renew') return `/api/stripe-inventory/update?subscriptionId=${subscriptionId}`
    else if (action === 'change') return `/api/stripe-inventory/portal?updateSubscriptionId=${subscriptionId}`
    else if (action === 'select') return `/api/stripe-inventory/checkout?priceId=${priceId}`
    return ''
}
const getPriceByProduct = (product: Product, interval: Interval): Price | null => {
    const price = product.prices?.find((price) => typeof price !== 'number' && price.interval === interval) as Price | undefined;
    if (!price) return null;
    return price;
}

export const calculateButtonActionType = (currentPriceId: string, subscription?: SubscriptionInventory): SubscriptionButtonActionType => {
    if (subscription && subscription.stripeData.priceId === currentPriceId) {
        if (subscription.subscriptionStripeData.canceledAtPeriodEnd) {
            return SubscriptionButtonActionType.renew;
        } else {
            return SubscriptionButtonActionType.cancel;
        }
    } else if (subscription && subscription.stripeData.priceId !== currentPriceId) {
        return SubscriptionButtonActionType.change;
    } else {
        return SubscriptionButtonActionType.select;
    }
}