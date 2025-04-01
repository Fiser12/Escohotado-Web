import { CategoryModel } from 'hegel'

export interface ArticleModel {
  id: number
  title: string
  slug: string
  content: {
    root: {
      children: Array<{
        children: Array<{
          text: string
        }>
        direction: null
        format: string
        indent: number
        type: string
        version: number
      }>
      direction: null
      format: string
      indent: number
      type: string
      version: number
    }
  }
  categories: CategoryModel[]
  createdAt: string
  updatedAt: string
  author: {
    id: number
    name: string
    email: string
  }
  featuredImage: {
    id: number
    url: string
    alt: string
  }
  excerpt: string
  status: 'published' | 'draft'
}
