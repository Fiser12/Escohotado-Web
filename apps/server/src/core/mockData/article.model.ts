import { ArticleWeb } from 'payload-types'
import { postsArticle } from './comments.model'
import { mockTaxonomies } from './categories.model'

export const generateMockArticle = ({
  title,
  coverHref,
}: {
  title: string
  coverHref?: string
}): ArticleWeb => ({
  id: 1,
  title,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  categories: [...mockTaxonomies].sort(() => Math.random() - 0.5).slice(0, 2),
  cover: {
    id: 1,
    url: coverHref ?? 'https://placehold.co/1200x600',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  forum_post_id: '1',
  last_forum_posts: postsArticle,
  content: {} as any,
  preview_content: {} as any,
  publishedAt: new Date().toISOString(),
})

export const mockArticles = [
  { title: 'Regalos mutuos' },
  { title: 'Estupor' },
  { title: 'Morir mejor' },
  { title: 'Lujosas cloacas' },
  { title: 'Sobria ebriedad' },
  { title: 'Cambiar de ejército' },
  { title: 'Administrando a un finado' },
  { title: 'Idiotas' },
  { title: '¡Viva Italia!' },
  { title: 'Vocales en una comunidad de vecinos' },
  { title: '¿Votar?' },
  { title: 'Emboscarse' },
  { title: 'Sentido adiós a un maestro y amigo' },
  { title: 'El consejo del miedo' },
  { title: 'Iniciativa popular' },
  { title: 'Desde el templo maldito' },
  { title: 'Por la libertad de información' },
  { title: 'La estrategia del cambio' },
  { title: 'La conjetura' },
  { title: 'Un rato con el monstruo' },
].map(generateMockArticle)
