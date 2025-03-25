"use server";

import { updatePrices } from "../utils/price";
import { updateProducts } from "../utils/product";
import { BasePayload } from "payload";

export async function updateProductsAndPrices(payload: BasePayload) {
  await updateProducts(payload);
  await updatePrices(payload);
}
