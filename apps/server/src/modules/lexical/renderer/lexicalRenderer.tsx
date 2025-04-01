import { ContentWrapper } from '@/components/layout/content_wrapper/content_wrapper'
import { ServiceInjector } from '@/modules/services'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import classNames from 'classnames'

export interface Props extends React.HTMLAttributes<HTMLDivElement>, ServiceInjector {
  data: SerializedEditorState
  useContentWrapper?: boolean
}

export function LexicalRenderer({ 
  className, 
  useContentWrapper = true, 
  services: Services,
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
      <Services.LexicalRenderer className={classes} {...rest} />
    </ContentWrapper>

  }
  return <Services.LexicalRenderer className={classes} {...rest} />
}