export interface BlockRenderer {
  slug: string
  builder: ({ node }: any) => Promise<JSX.Element>
}

