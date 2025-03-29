import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { mapCards } from "@/core/mappers/mapCards";
import { GridCardsBlock } from "@/components/content/featured_grid_home/GridCardsBlock";
export const renderer = async ({ node }: any) => {
  const user = await getCurrentUserQuery();
  const gridCards = node?.fields ?? []
  const result = await mapCards(user)(gridCards)
  return <GridCardsBlock features={result.features} className={result.gridClassname} />
}