import { CollectionConfig } from "payload";
import {
  COLLECTION_SLUG_PRICES,
  COLLECTION_SLUG_PRODUCTS
} from "../../common";
import {
  permissionRelationship,
  cachePermissionSeedsHook,
  isAdminOrStripeActive,
  isAdmin,
} from "payload-access-control";

export const products: CollectionConfig = {
  slug: COLLECTION_SLUG_PRODUCTS,
  admin: {
    useAsTitle: "name",
    group: "Stripe",
    components: {
      views: {
        list: {
          actions: [{ path: "payload-stripe-inventory/client#UpdateProductsButton" }],
        },
      },
    },
  },
  access: {
    read: isAdminOrStripeActive,
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [cachePermissionSeedsHook()],
  },
  fields: [
    {
      name: "stripeID",
      label: "Stripe ID",
      type: "text",
      required: true,
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "type",
      type: "select",
      options: [
        { value: "good", label: "Bienes" },
        { value: "service", label: "Service" },
      ],
    },
    {
      name: "active",
      type: "checkbox",
      required: true,
      admin: { position: "sidebar" },
    },
    { name: "name", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "images", type: "array", fields: [{ type: "text", name: "url" }] },
    {
      name: "prices",
      type: "relationship",
      relationTo: COLLECTION_SLUG_PRICES,
      hasMany: true,
      required: false,
    },
    { name: "metadata", type: "json", label: "Metadata" },
    {
      type: "array",
      name: "features",
      fields: [{ type: "text", name: "title" }],
    },
    ...permissionRelationship(),
  ],
};
