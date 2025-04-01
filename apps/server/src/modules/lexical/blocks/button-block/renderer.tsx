
import { LexicalBlockProps } from 'payload-lexical-blocks-builder/renderer';
import { LexicalButtonsRenderer } from '@/modules/lexical/blocks/button-block/button-renderer';
import { ButtonsBlock } from 'payload-types';

interface Props extends LexicalBlockProps<ButtonsBlock> {

}

export const renderer = async ({ node }: Props) => {
  return <LexicalButtonsRenderer 
    buttons={node.fields.buttons ?? []} 
    alignment={node.fields.alignment ?? "center"}
  />
}

