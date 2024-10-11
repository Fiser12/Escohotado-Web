import type Stripe from "stripe";
import { prismaClient } from "../prisma_client.js";
import { notNullAsync } from "../../../../../../../packages/gaudi/src/domain/optional_helpers.js";
import { upsertPrice } from "./upsert_stripe_price_prisma.js";

export async function upsertLineItem(lineItem: Stripe.LineItem, checkoutId: string) {
  const lineItemData = {
    ammountDiscount: lineItem.amount_discount,
    ammountSubtotal: lineItem.amount_subtotal,
    ammountTotal: lineItem.amount_total,
    ammountTax: lineItem.amount_tax,
    currency: lineItem.currency,
    description: lineItem.description,
    discounts: lineItem.discounts ?? [],
    taxes: lineItem.taxes ?? [],

    price: { connect: { id: lineItem.price?.id } },
    checkoutSession: { connect: { id: checkoutId } }
  }

  await notNullAsync(lineItem.price, price => upsertPrice(price))

  await prismaClient.stripeLineItem.upsert({
    where: { id: lineItem.id },
    update: lineItemData,
    create: {
      id: lineItem.id,
      ...lineItemData,
    }
  });
}

