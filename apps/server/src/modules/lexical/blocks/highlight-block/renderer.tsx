import { ButtonLexicalType } from '@/modules/lexical/blocks/button-block/button-renderer';
import { LexicalButtonsRenderer } from '@/modules/lexical/blocks/button-block/button-renderer';
import { HighlightSection } from '@/components/organisms/details/article/highlight/section_highlight';
import { LexicalBlockProps } from 'payload-lexical-blocks-builder/renderer';
import { HighlightBlock } from 'payload-types';
import { Typo } from '@/components/atoms/typographies/Typographies';

interface Props extends LexicalBlockProps<HighlightBlock> {
}

export const renderer = async ({ node }: Props) => {
  const buttons = node.fields.buttons?.cast<ButtonLexicalType>() ?? []
  const style = node.fields.background_style ?? "primary"

  return <HighlightSection className='ignore-wrapper' type={style} >
    <Typo.H4 className={style == "primary" ? "text-white" : ""}>{node.fields.content ?? ""}</Typo.H4>
    <LexicalButtonsRenderer buttons={buttons} />
  </HighlightSection>
}

