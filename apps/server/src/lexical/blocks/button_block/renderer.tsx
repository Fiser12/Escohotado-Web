
import { ButtonLexicalType } from '../button_block/buttonField';
import { LexicalButtonsRenderer } from '../button_block/buttonRenderer';

export const renderer = async ({ node }: any) => {
  const buttons: ButtonLexicalType[] = node.fields.buttons
  return <LexicalButtonsRenderer buttons={buttons} />
}

