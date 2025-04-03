import { Typo } from '@/components/atoms/typographies';
import { BasicHighlightSection } from '@/components/organisms/details/article/highlight';
import { ButtonLexicalType, LexicalButtonsRenderer } from '@/modules/lexical/blocks/button-block/button-renderer';
import { LexicalBlockProps } from 'payload-lexical-blocks-builder/renderer';
import { HighlightBlock } from 'payload-types';

interface Props extends LexicalBlockProps<HighlightBlock> {
}

export const renderer = async ({ node }: Props) => {
  const buttons = node.fields.buttons?.cast<ButtonLexicalType>() ?? []
  const style = node.fields.background_style ?? "primary"

  return <BasicHighlightSection className='ignore-wrapper' type={style} >
    <Typo.H4 className={style == "primary" ? "text-white" : ""}>{node.fields.content ?? ""}</Typo.H4>
    <LexicalButtonsRenderer buttons={buttons} />
  </BasicHighlightSection>
}

