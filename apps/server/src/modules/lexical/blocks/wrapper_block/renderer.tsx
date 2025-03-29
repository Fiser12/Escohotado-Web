import classNames from 'classnames'
import { LexicalRenderer } from '../../lexicalRenderer'
import { evalAdvancePermissionQuery } from 'payload-access-control';
import { ContentWrapper } from '@/components/common/content_wrapper/content_wrapper';
import { LexicalBlockProps } from 'payload-lexical-blocks-builder/renderer';
import { WrapperBlock } from 'payload-types';
import { getCurrentUserQuery } from '@/core/queries/getCurrentUserQuery';

interface Props extends LexicalBlockProps<WrapperBlock> {
}

export const renderer = async ({ node }: Props) => {
  const className = classNames(
    'py-10 h-full ignore-wrapper',
    {
      'bg-white': node.fields.type === 'white',
      'bg-gray-light': node.fields.type === 'gray',
    }
  );
  const user = await getCurrentUserQuery()
  const permissions = typeof node.fields.permissions?.value === "number" 
    ? null 
    : node.fields.permissions?.value

  const hasPermission = await evalAdvancePermissionQuery(
    user,
    node.fields.type_of_permissions ?? "all",
    permissions?.slug
  )
  if (!hasPermission || !node.fields.content) return null
  return <ContentWrapper backgroundClassname={className} >
    <LexicalRenderer data={node.fields.content} />
  </ContentWrapper>
}

