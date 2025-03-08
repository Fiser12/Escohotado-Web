import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from "./index";
import { ContentCardModel } from "hegel";

const featuredGrid01: { gridClassname: string, features: ContentCardModel[] } = {
      gridClassname: "grid-cols-1 sm:grid-cols-4 md:grid-cols-5",
      features: [
            {
                  id: 1,
                  type: "video",
                  className: "col-span-1 sm:col-span-4 md:col-span-2 row-span-1 lg:row-span-2",
                  title: "250.000 agradecimientos escohotadianos a todos los emboscados",
                  publishedAt: "2024-11-18",
                  coverHref: "https://placehold.co/300x200",
                  detailHref: "#",
                  hasPermission: true,
                  href: "/",
                  categories: [
                        { label: "Historia", id: 1 },
                        { label: "Filosofía", id: 2 },
                  ],
            },
            {
                  id: 2,
                  type: "article",
                  className: "col-span-1 sm:col-span-2 md:col-span-3  row-span-2 md:row-span-1",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: 1 },
                        { label: "Filosofía", id: 2 },
                  ],
            },
            {
                  id: 3,
                  type: "article",
                  className: "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: 1 },
                        { label: "Filosofía", id: 2 },
                  ],
            },
            {
                  id: 4,
                  type: "quote",
                  className: "col-span-1 sm:col-span-2",
                  origen: {
                        title: "Caos y Orden",
                        type: "book",
                        detailHref: "/collections/caos-y-orden",
                        hasPermissions: true,
                  },
                  categories: [
                        {
                              id: 1,
                              label: "Drogas",
                        },
                        {
                              id: 2,
                              label: "Educación",
                        },
                  ],
                  context: null,
                  quote:
                        "La libertad no es algo que se nos dé, sino algo que conquistamos; no es una gracia ni un privilegio, sino una responsabilidad. Ser libre significa asumir la propia vida con todas sus consecuencias, sin delegar en otros las decisiones fundamentales, y sin buscar excusas en el destino o en la sociedad. Solo quien es capaz de enfrentarse a sus miedos y contradicciones puede aspirar a la libertad.",
                  author: "Antonio Escohotado",
            },
      ]
};

const featuredGrid02: { gridClassname: string, features: ContentCardModel[] } = {
      gridClassname: "grid-cols-1 sm:grid-cols-4 md:grid-cols-5",
      features: [
            {
                  id: 1,
                  type: "quote",
                  className: "col-span-1 sm:col-span-2",
                  origen: {
                        title: "Caos y Orden",
                        type: "book",
                        detailHref: "/collections/caos-y-orden",
                        hasPermissions: true,
                  },
                  categories: [
                        {
                              id: 1,
                              label: "Drogas",
                        },
                        {
                              id: 2,
                              label: "Educación",
                        },
                  ],
                  context: null,
                  quote:
                        "La libertad no es algo que se nos dé, sino algo que conquistamos; no es una gracia ni un privilegio, sino una responsabilidad. Ser libre significa asumir la propia vida con todas sus consecuencias, sin delegar en otros las decisiones fundamentales, y sin buscar excusas en el destino o en la sociedad. Solo quien es capaz de enfrentarse a sus miedos y contradicciones puede aspirar a la libertad.",
                  author: "Antonio Escohotado",
            },
            {
                  id: 2,
                  type: "article",
                  className: "col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: 1 },
                        { label: "Filosofía", id: 2 },
                  ],
            },
            {
                  id: 3,
                  type: "book",
                  className: "col-span-1 sm:col-span-4 md:col-span-2 row-span-2",
                  title: "Confesiones de un opiófilo",
                  quote:
                        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  coverHref: "https://placehold.co/300x400",
            },
            {
                  id: 4,
                  type: "video",
                  className: "col-span-1 sm:col-span-4 md:col-span-3",
                  title: "250.000 agradecimientos escohotadianos a todos los emboscados",
                  publishedAt: "2024-11-18",
                  coverHref: "https://placehold.co/300x200",
                  detailHref: "#",
                  hasPermission: true,
                  href: "/",
                  categories: [
                        { label: "Historia", id: 1 },
                        { label: "Filosofía", id: 2 },
                  ],
            },
      ]
};

const featuredGrid03: { gridClassname: string, features: ContentCardModel[] } = {
      gridClassname: "grid-cols-1 sm:grid-cols-4 lg:grid-cols-5",
      features: [
            {
                  id: "1",
                  type: "video",
                  className: "col-span-1 sm:col-span-4 md:col-span-2 row-span-1 lg:row-span-2",
                  title: "250.000 agradecimientos escohotadianos a todos los emboscados",
                  publishedAt: "2024-11-18",
                  coverHref: "https://placehold.co/300x200",
                  detailHref: "#",
                  hasPermission: true,
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "2",
                  type: "article",
                  className: "col-span-1 sm:col-span-2 lg:col-span-2",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "3",
                  type: "article",
                  className: "col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "4",
                  type: "article",
                  className: "col-span-1 sm:col-span-2 lg:col-span-1",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "5",
                  type: "article",
                  className: "col-span-1 sm:col-span-2 lg:col-span-2",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
      ]
};

const featuredGrid04: { gridClassname: string, features: ContentCardModel[] } = {
      gridClassname: "grid-cols-1 sm:grid-cols-4 lg:grid-cols-5",
      features: [
            {
                  id: "1",
                  type: "book",
                  className: "col-span-1 sm:col-span-4 lg:col-span-1 row-span-1 lg:row-span-2",
                  title: "Confesiones de un opiófilo",
                  quote:
                        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  coverHref: "https://placehold.co/300x400",
            },
            {
                  id: "2",
                  type: "article",
                  className: "col-span-1 sm:col-span-2 lg:col-span-2",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "3",
                  type: "video",
                  className: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2",
                  title: "250.000 agradecimientos escohotadianos a todos los emboscados",
                  publishedAt: "2024-11-18",
                  coverHref: "https://placehold.co/300x200",
                  detailHref: "#",
                  hasPermission: true,
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "4",
                  type: "article",
                  className: "col-span-1 sm:col-span-4 lg:col-span-2",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
            {
                  id: "5",
                  type: "quote",
                  className: "col-span-1 sm:col-span-2 lg:col-span-2 order-5 md:order-6 lg:order-5",
                  origen: {
                        title: "Caos y Orden",
                        type: "book",
                        detailHref: "/collections/caos-y-orden",
                        hasPermissions: true,
                  },
                  categories: [
                        {
                              id: "1",
                              label: "Drogas",
                        },
                        {
                              id: "2",
                              label: "Educación",
                        },
                  ],
                  context: null,
                  quote:
                        "La libertad no es algo que se nos dé, sino algo que conquistamos; no es una gracia ni un privilegio, sino una responsabilidad. Ser libre significa asumir la propia vida con todas sus consecuencias, sin delegar en otros las decisiones fundamentales, y sin buscar excusas en el destino o en la sociedad. Solo quien es capaz de enfrentarse a sus miedos y contradicciones puede aspirar a la libertad.",
                  author: "Antonio Escohotado",
            },
            {
                  id: "6",
                  type: "article",
                  className: "col-span-1 sm:col-span-2 lg:col-span-3 md:order-5 lg:order-6",
                  title: "El origen de la civilización y fbndfkjbn dnfjhvdnfv dfnbkjdfnb dnfbkjdnf",
                  author: "Antonio Escohotado",
                  detailHref: "#",
                  hasPermission: true,
                  isPdf: true,
                  coverHref: "https://placehold.co/600x800",
                  href: "/",
                  categories: [
                        { label: "Historia", id: "1" },
                        { label: "Filosofía", id: "2" },
                  ],
            },
      ]
};

const meta: Meta<typeof HomePage> = {
      title: "Pages/Grids",
      component: HomePage,
      parameters: {
            layout: "fullscreen",
            design: {
                  type: "figspec",
                  url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=283-707&t=acmeOqADvcdhZQZx-4"
            },
      },
      args: {
            buttons: [
                  { title: "Ver más", link: "/libros" },
            ],
            description: "Filósofo y ensayista español, dedicó su vida a explorar y desafiar las convenciones sociales."
      }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Grid01: Story = {
      name: "featured Grid 01",
      args: {
            featuredItems: [featuredGrid01 as any],
      }
};

export const Grid02: Story = {
      name: "featured Grid 02",
      args: {
            featuredItems: [featuredGrid02 as any],
      }
};

export const Grid03: Story = {
      name: "featured Grid 03",
      args: {
            featuredItems: [featuredGrid03 as any],
      }
};

export const Grid04: Story = {
      name: "featured Grid 04",
      args: {
            featuredItems: [featuredGrid04 as any],
      }
};
