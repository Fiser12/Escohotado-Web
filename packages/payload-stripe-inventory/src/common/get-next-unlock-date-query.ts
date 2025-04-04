import { BaseUser, UserInventory } from "payload-access-control";

export const getNextUnlockDateQuery = (user: BaseUser<UserInventory>): Date => {
  const inventory = user.inventory;
  if (!inventory || !inventory.unlocks || inventory.unlocks.length === 0) {
    return new Date();
  }

  const lastUnlock = inventory.unlocks.sort(
    (a, b) =>
      new Date(a.dateUnlocked).getTime() - new Date(b.dateUnlocked).getTime()
  )[inventory.unlocks.length - 1];

  const lastUnlockDate = new Date(lastUnlock.dateUnlocked);
  const nextUnlockDate = new Date(lastUnlockDate);
  nextUnlockDate.setDate(lastUnlockDate.getDate() + 7);

  return nextUnlockDate;
};
