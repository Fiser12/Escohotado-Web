import { H4 } from 'gaudi/server';
import { HighlightSection } from 'gaudi/client';

export const renderer = async ({ node }: any) => {
  return <HighlightSection className='ignore-wrapper'>
    <H4 label={node.fields.content} className="text-white text-center"></H4>

  </HighlightSection>
}

