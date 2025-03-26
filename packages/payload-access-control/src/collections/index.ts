import { CollectionConfig } from "payload";
import { COLLECTION_SLUG_PERMISSION } from "../constants";
import { isAnyone, isAdmin } from "../access";

export const permissionCollection: CollectionConfig = {
  slug: COLLECTION_SLUG_PERMISSION,
  labels: {
    singular: "Permiso",
    plural: "Permisos",
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "title",
    group: "Auth",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
};
