'use client';

import { useState } from "react";
import { ToggleButtonGroup } from "../common/toggle_button_group/toggle_button_group";
import { SubscriptionCard } from "./subscription_card";
import { Interval, IntervalOptions } from "hegel";

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
interface Props {
    products: Product[];
    options: IntervalOptions[];
}

export const SubscriptionsGroupCard = ({
    products,
    options
}: Props): JSX.Element => {
    const [selected, setSelected] = useState(options[0]?.id);

    const getPriceByProduct = (product: Product, interval: Interval): string => {
        const price = product.prices?.find((price) => typeof price !== 'string' && price.interval === interval) as Price | undefined;
        if (!price) return 'N/A';
        return `${price.unitAmount / 100} ${price.currency}`;
    }

    return (
        <>
            <ToggleButtonGroup options={options} selected={selected!} setOption={setSelected as () => void} />
            <div className="h-96 justify-start items-start gap-7 inline-flex">
                {products.map((product) => (
                    <SubscriptionCard
                        key={product.id}
                        title={product.name}
                        price={getPriceByProduct(product, selected!)}
                        features={[]}
                        /* @ts-ignore */
                        mainCard={product.metadata?.prominent === 'true'}
                    >

                    </SubscriptionCard>
                ))}
            </div>
        </>
    );
};

