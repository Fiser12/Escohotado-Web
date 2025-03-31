import { getCurrentUserQuery } from "@/core/queries/getCurrentUserQuery";
import { mapCards } from "@/core/mappers/mapCards";
import { GridCards } from "@/components/content/grid_cards/GridCards";
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer";
import { GridCardsBlock as GridCardsBlockPayload } from 'payload-types'

interface Props extends LexicalBlockProps<GridCardsBlockPayload> {

}

export const renderer = async ({ node }: Props) => {
  const user = await getCurrentUserQuery();
  const gridCards = node?.fields ?? []
  const result = await mapCards(user)(gridCards)
  return <GridCards features={result.features} className={result.gridClassname} />
}