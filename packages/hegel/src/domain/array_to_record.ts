export function arrayToRecord<T>(array: T[], key: keyof T): Record<string, T> {
  const result: Record<string, T> = {};
  for (const item of array) {
    const itemKey = item[key];
    if (itemKey) {
      result[String(itemKey)] = item;
    }
  }
  return result;
}
