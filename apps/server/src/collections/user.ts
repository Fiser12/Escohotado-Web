import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  fields: [
    {
      name: "roles",
      type: "json",
      typescriptSchema: [
        () => ({
          type: "array",
          items: {
            type: "string",
          },
        }),
      ],
    },
  ],
};

export default Users;
