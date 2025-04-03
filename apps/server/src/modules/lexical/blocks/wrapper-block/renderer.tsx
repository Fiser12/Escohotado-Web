import { ContentWrapper } from '@/components/layout/content-wrapper';
import { getCurrentUserQuery } from '@/core/queries/get-current-user-query';
import { LexicalRenderer } from "@/modules/lexical/renderer/lexical-renderer";
import { Services, servicesProd } from '@/modules/services';
import classNames from 'classnames';
import { evalAdvancePermissionQuery } from 'payload-access-control';
import { LexicalBlockProps } from 'payload-lexical-blocks-builder/renderer';
import { WrapperBlock } from 'payload-types';

interface Props extends LexicalBlockProps<WrapperBlock> {
  services?: Services
}

export const renderer = async ({ node, services = servicesProd }: Props) => {
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
    <LexicalRenderer
      data={node.fields.content}
      services={services}
    />
  </ContentWrapper>
}

