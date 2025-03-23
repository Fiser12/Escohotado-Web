import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { mapCards } from "@/core/mappers/mapCards";
import { GridCardsBlock as GridCardsBlockUI } from 'gaudi/server'

export const renderer = async ({ node }: any) => {
  const user = await getCurrentUserQuery();
  const gridCards = node?.fields ?? []
  const result = await mapCards(user)(gridCards)
  return <GridCardsBlockUI features={result.features} className={result.gridClassname} />
}