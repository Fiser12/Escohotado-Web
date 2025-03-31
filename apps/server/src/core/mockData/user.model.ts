import { MenuSection } from 'hegel'
import { BaseUser, SubscriptionInventory, UserInventory } from 'payload-access-control'

interface MockSubscriptionProps {
  id?: string
  status: string
  permissions?: string[]
}

function mockSubscription({
  id,
  status,
  permissions = [],
}: MockSubscriptionProps): SubscriptionInventory {
  return {
    permissions: permissions,
    productId: 1,
    stripeData: {
      createdAt: new Date(),
      customerId: '1',
      priceId: '1',
      metadata: {},
      subscriptionId: '1',
    },
    subscriptionStatus: status,
    subscriptionStripeData: {
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(),
      endedAt: null,
      cancelAt: null,
      canceledAt: null,
      canceledAtPeriodEnd: false,
      trial: {
        start: null,
        end: null,
      },
    },
  }
}

export const mockUsers = {
  admin: mockUser({ isAdmin: true }),
  basic: mockUser({ permissions: ['basic'] }),
  free: mockUser({ withSubscription: false }),
  noUser: null,
}
export function menuSectionsLoaderMock(user: BaseUser): MenuSection[] {
  if (!user) {
    return []
  }
  let sections: MenuSection[] = [
    {
      items: [
        { text: 'Cuenta', href: 'relativeUrls.user.profile' },
        { text: 'Suscripción', href: 'relativeUrls.subscriptions.list' },
      ],
    },
  ]
  if (user.roles?.includes('webAdmin')) {
    sections.push({
      title: 'Administración',
      items: [
        { text: 'Usuarios', href: 'relativeUrls.admin.users' },
        { text: 'Contenido', href: 'relativeUrls.admin.content.root' },
      ],
    })
  }
  return sections
}

interface MockUserProps {
  id?: string
  withSubscription?: boolean
  isAdmin?: boolean
  permissions?: string[]
}

export function mockUser({ permissions, withSubscription = true, isAdmin = false }: MockUserProps): BaseUser<UserInventory> {
  return {
    id: '123',
    name: 'Rubén',
    email: 'ruben@nexolabs.xyz',
    image: 'https://fake.com/image.jpg',
    roles: isAdmin ? ['webAdmin'] : [],
    inventory: {
      favorites: [],
      products: {},
      stripeCustomerId: '1',
      unlocks: [],
      subscriptions: withSubscription ? {
        '1': mockSubscription({ status: 'active', permissions: permissions }),
      } : {},
    }
  }
}
