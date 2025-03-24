import classNames from 'classnames'
import { LexicalRenderer } from '../../lexicalRenderer'
import { ContentWrapper } from 'gaudi/server'
import { evalAdvancePermissionQuery } from 'payload-access-control';

export const renderer = async ({ node }: any) => {
  const className = classNames(
    'py-10 h-full ignore-wrapper',
    {
      'bg-white': node.fields.type === 'white',
      'bg-gray-light': node.fields.type === 'gray',
    }
  );
  const hasPermission = await evalAdvancePermissionQuery(
    node.fields.type_of_permissions,
    node.fields.permissions?.value?.slug
  )
  if (!hasPermission) return null
  return <ContentWrapper backgroundClassname={className} >
    <LexicalRenderer data={node.fields.content} />
  </ContentWrapper>
}

