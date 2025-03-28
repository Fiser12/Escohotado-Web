import { H4 } from '@/components/common/headers/H4';
import { ButtonLexicalType } from '../button_block/buttonField';
import { LexicalButtonsRenderer } from '../button_block/buttonRenderer';
import { HighlightSection } from '@/components/content/article/highlight/section_highlight';
export const renderer = async ({ node }: any) => {
  const buttons: ButtonLexicalType[] = node.fields.buttons
  const style = node.fields.background_style ?? "primary"
  return <HighlightSection className='ignore-wrapper' type={style} >
    <H4 label={node.fields.content} className={style == "primary" ? "text-white": ""}></H4>
    <LexicalButtonsRenderer buttons={buttons} />
  </HighlightSection>
}

