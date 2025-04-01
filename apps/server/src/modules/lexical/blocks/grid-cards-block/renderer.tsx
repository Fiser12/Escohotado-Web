import { GridCards } from "@/components/organisms/lexical/grid_cards/GridCards";
import { mapCards } from "@/core/mappers/map-cards";
import { getCurrentUserQuery } from "@/core/queries/get-current-user-query";
import { LexicalBlockProps } from "payload-lexical-blocks-builder/renderer";
import { GridCardsBlock } from 'payload-types';

interface Props extends LexicalBlockProps<GridCardsBlock> {

}

export const renderer = async ({ node }: Props) => {
  const user = await getCurrentUserQuery();
  const result = await mapCards(user)(node.fields)
  return <GridCards features={result.features} className={result.gridClassname} />
}