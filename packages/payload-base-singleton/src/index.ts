import type { Payload } from "payload";

declare global {
  var payloadInstance: Payload | null;
}

global.payloadInstance = global.payloadInstance || null;

export const getPayloadSingleton = (): Payload => {
  if (!global.payloadInstance) {
    throw new Error("Payload instance not initialized");
  }
  return global.payloadInstance;
};

export const loadPayloadSingleton = async (payload: () => Promise<Payload>) => {
  if (global.payloadInstance) {
    return;
  }
  global.payloadInstance = await payload();
};
