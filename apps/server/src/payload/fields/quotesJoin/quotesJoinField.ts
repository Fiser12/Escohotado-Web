import { Field } from "payload";

export const quotesJoinField: Field = {
  type: "join",
  name: "quotes",
  collection: "quote",
  on: "source",
  defaultLimit: 10,
  defaultSort: "-createdAt"
}