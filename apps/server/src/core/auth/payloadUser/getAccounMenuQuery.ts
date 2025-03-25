import { routes } from '@/core/routesGenerator'
import { MenuSection } from 'hegel'
import { BaseUser, permissionSlugs } from 'payload-access-control'

export const getAccountMenuQuery = <T extends BaseUser>(user?: T | null): MenuSection[] => {
  if (!user) {
    return []
  }

  let sections: MenuSection[] = [
    {
      items: [
        { text: 'Cuenta', href: routes.nextJS.accountPageHref },
        { text: 'Suscripción', href: routes.nextJS.subscriptionPageHref },
      ],
    },
  ]

  if (user.roles?.includes(permissionSlugs.webAdmin)) {
    sections.push({
      title: 'Administración',
      items: [{ text: 'Admin', href: '/admin' }],
    })
  }

  return sections
}
