import { H4 } from '@/components/common/headers/H4';
import { ButtonLexicalType } from '../button_block/buttonRenderer';
import { LexicalButtonsRenderer } from '../button_block/buttonRenderer';
import { HighlightSection } from '@/components/content/article/highlight/section_highlight';
import { LexicalBlockProps } from 'payload-lexical-blocks-builder/renderer';
import { HighlightBlock } from 'payload-types';

interface Props extends LexicalBlockProps<HighlightBlock> {
}
export const renderer = async ({ node }: Props) => {
  const buttons = node.fields.buttons?.cast<ButtonLexicalType>() ?? []
  const style = node.fields.background_style ?? "primary"
  
  return <HighlightSection className='ignore-wrapper' type={style} >
    <H4 label={node.fields.content ?? ""} className={style == "primary" ? "text-white": ""}></H4>
    <LexicalButtonsRenderer buttons={buttons} />
  </HighlightSection>
}

