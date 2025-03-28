import { BaseUser, UnlockItem } from "payload-access-control";

export const isContentUnlocked = (
  user: BaseUser,
  contentId: number,
  collection: string
): boolean => {
  if (!user?.inventory?.unlocks) return false;

  return user.inventory.unlocks.some(
    (unlock: UnlockItem) =>
      unlock.id === contentId && unlock.collection === collection
  );
};
