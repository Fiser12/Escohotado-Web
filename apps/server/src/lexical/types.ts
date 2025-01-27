export interface BlockRenderer {
  slug: string
  builder: ({ node }: any) => any
}

