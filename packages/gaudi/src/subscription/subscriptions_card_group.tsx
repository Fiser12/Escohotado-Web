'use client';

import { useState } from "react";
import { ToggleButtonGroup } from "../common/toggle_button_group/toggle_button_group";
import { SubscriptionCard } from "./subscription_card";
import { Interval, IntervalOptions } from "hegel";
import { SubscriptionButton } from "./subscription_button";

interface Price {
    id: string;
    currency: string;
    unitAmount: number;
    interval?: Interval | null;
}
interface Product {
    id: string;
    name: string;
    metadata?: any;
    prices?: (string | Price)[] | null;
}

export interface Subscription {
    id: string;
    priceId: string;
    canceled?: {
        isCanceled: boolean;
        canceledAt: number;
    }
}

export enum SubscriptionButtonActionType {
    cancel = 'cancel',
    renew = 'renew',
    change = 'change',
    select = 'select'
}

interface Props {
    products: Product[];
    subscription?: Subscription;
    options: IntervalOptions[];
    action: (action: SubscriptionButtonActionType) => Promise<void>;
}

export const SubscriptionsGroupCard = ({
    products,
    subscription,
    options,
    action
}: Props): JSX.Element => {
    const [selected, setSelected] = useState(options[0]!.id);

    return (
        <>
            <ToggleButtonGroup options={options} selected={selected!} setOption={setSelected as () => void} />
            <div className="h-96 justify-start items-start gap-7 inline-flex">
                {products
                    .map((product) => ({ product, price: getPriceByProduct(product, selected) }))
                    .map(({ product, price }) => (
                        <SubscriptionCard
                            key={product.id}
                            title={product.name}
                            price={price}
                            features={[]}
                            mainCard={product.metadata?.prominent === 'true'}
                        >
                            <form action={async () => {
                                await action(calculateButtonActionType(price, subscription));
                            }}>
                                <button type="submit" >
                                    <SubscriptionButton
                                        subscription={subscription}
                                        currentPriceId={price}
                                    />
                                </button>
                            </form>
                        </SubscriptionCard>
                    ))}
            </div>
        </>
    );
};

const getPriceByProduct = (product: Product, interval: Interval): string => {
    const price = product.prices?.find((price) => typeof price !== 'string' && price.interval === interval) as Price | undefined;
    if (!price) return 'N/A';
    return `${price.unitAmount / 100} ${price.currency}`;
}

export const calculateButtonActionType = (currentPriceId: string, subscription?: Subscription): SubscriptionButtonActionType => {
    if (subscription && subscription.priceId === currentPriceId) {
        if (subscription.canceled?.isCanceled) {
            return SubscriptionButtonActionType.cancel;
        } else {
            return SubscriptionButtonActionType.renew;
        }
    } else if (subscription && subscription.priceId !== currentPriceId) {
        return SubscriptionButtonActionType.change;
    } else {
        return SubscriptionButtonActionType.select;
    }
}