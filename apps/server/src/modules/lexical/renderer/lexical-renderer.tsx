import { ContentWrapper } from '@/components/layout/content-wrapper'
import { ServiceInjector } from '@/modules/services'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import classNames from 'classnames'

export interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
  data?: SerializedEditorState | null
  useContentWrapper?: boolean
}

export function LexicalRenderer({
  className,
  useContentWrapper = true,
  services: Services,
  data,
  children,
  ...rest
}: Props) {
  const classes = classNames(
    'article-html-content',
    "max-w-none",
    "w-full",
    className,
  )
  if (useContentWrapper) {
    return <ContentWrapper>
      <Services.LexicalRenderer className={classes} data={data} />
    </ContentWrapper>

  }
  return <Services.LexicalRenderer className={classes} {...rest} data={data} />
}