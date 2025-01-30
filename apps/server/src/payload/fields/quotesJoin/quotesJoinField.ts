import { Field } from "payload";

export const quotesJoinField: Field = {
  type: "join",
  name: "quotes",
  collection: "quote",
  on: "source",
  defaultLimit: 10,
  maxDepth: 2,
  defaultSort: "-createdAt"
}