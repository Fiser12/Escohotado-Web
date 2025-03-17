import { H4 } from 'gaudi/server';
import { HighlightSection, MainButton } from 'gaudi/client';
import { ButtonLexicalType } from '../button_block/buttonField';
import { LexicalButtonsRenderer } from '../button_block/buttonRenderer';

export const renderer = async ({ node }: any) => {
  const buttons: ButtonLexicalType[] = node.fields.buttons
  const style = node.fields.background_style ?? "primary"
  return <HighlightSection className='ignore-wrapper' type={style} >
    <H4 label={node.fields.content} className={style == "primary" ? "text-white": ""}></H4>
    <LexicalButtonsRenderer buttons={buttons} />
  </HighlightSection>
}

