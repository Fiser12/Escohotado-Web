"use server";

import { updatePrices } from "../utils/price";
import { updateProducts } from "../utils/product";
import { getPayloadSingleton } from "payload-base-singleton";

export async function updateProductsAndPrices() {
  const payload = await getPayloadSingleton();
  await updateProducts(payload);
  await updatePrices(payload);
}
