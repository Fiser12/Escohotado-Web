"use server";

import { getPayloadSingleton } from "payload-base-singleton";
import { updateProducts, updatePrices } from ".";

export async function updateProductsAndPrices() {
  const payload = await getPayloadSingleton();
  await updateProducts(payload);
  await updatePrices(payload);
}
