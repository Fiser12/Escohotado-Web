import { CategoryModel } from 'hegel'

export const mockCategories: CategoryModel[] = [
  { id: 1, slug: 'filosofia', label: 'Filosofía' },
  { id: 2, slug: 'libertad', label: 'Libertad' },
  { id: 3, slug: 'religion', label: 'Religión' },
  { id: 4, slug: 'homenaje', label: 'Homenajes' },
  { id: 5, slug: 'veneno', label: 'Venenos' },
  { id: 6, slug: 'drogas', label: 'Drogas' },
  { id: 7, slug: 'economia', label: 'Economía' },
  { id: 8, slug: 'sociedad', label: 'Sociedad' },
  { id: 9, slug: 'historia', label: 'Historia' },
  { id: 10, slug: 'pensamiento', label: 'Pensamiento' },
]

export const mockTaxonomies = mockCategories.map((category) => ({
    id: category.id,
    singular_name: category.label,
    plural_name: category.label,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slug: category.slug,
  }))
    