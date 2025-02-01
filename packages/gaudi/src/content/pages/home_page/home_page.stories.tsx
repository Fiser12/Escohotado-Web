import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";
import { ContentCardModel } from "hegel";
const featuredItem: { gridClassname: string, features: ContentCardModel[] } = {
  gridClassname: "grid-cols-1 md:grid-cols-4",
  features: [
    {
      id: "1",
      type: "article",
      className: "col-span-1 md:col-span-2 lg:col-span-3",
      title: "El origen de la civilización",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/600x800",
      href: "/",
      categories: [
        { label: "Historia", id: "1" },
        { label: "Filosofía", id: "2" },
      ],
      detailHref: "#",
      isPdf: false,
      hasPermission: true,
    },
    {
      id: "2",
      type: "quote",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      categories: [],
      context: null,
      quote:
        "La libertad no es algo que se nos dé, sino algo que conquistamos; no es una gracia ni un privilegio, sino una responsabilidad. Ser libre significa asumir la propia vida con todas sus consecuencias, sin delegar en otros las decisiones fundamentales, y sin buscar excusas en el destino o en la sociedad. Solo quien es capaz de enfrentarse a sus miedos y contradicciones puede aspirar a la libertad.",
      author: "Antonio Escohotado",
    },
    {
      id: "3",
      type: "book",
      className: "col-span-1 md:col-span-3",
      title: "Confesiones de un opiófilo",
      quote:
        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
      author: "Antonio Escohotado",
      detailHref: "#",
      coverHref: "https://placehold.co/300x400",
    },
    {
      id: "4",
      type: "video",
      className: "col-span-1 md:col-span-1",
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
      id: "5",
      type: "article",
      className: "col-span-1 md:col-span-2 lg:col-span-3",
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
      id: "6",
      type: "article",
      className: "col-span-1 row-span-2",
      title: "El origen de la civilización",
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
      id: "7",
      type: "article",
      className: "col-span-1 md:col-span-2",
      title: "El origen de la civilización",
      detailHref: "#",
      hasPermission: true,
      isPdf: true,
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/600x800",
      href: "/",
      categories: [
        { label: "Historia", id: "1" },
        { label: "Filosofía", id: "2" },
      ],
    },
    {
      id: "8",
      type: "article",
      className: "col-span-1",
      detailHref: "#",
      hasPermission: true,
      isPdf: false,
      title: "El origen de la civilización",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/600x800",
      href: "/",
      categories: [
        { label: "Historia", id: "1" },
        { label: "Filosofía", id: "2" },
      ],
    },
    {
      id: "9",
      type: "book",
      className: "col-span-1 row-span-1 md:row-span-2 md:col-span-2",
      title: "Confesiones de un opiófilo",
      detailHref: "#",
      quote:
        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/300x400",
    },
    {
      id: "10",
      type: "book",
      className: "col-span-1 md:col-span-2",
      detailHref: "#",
      title: "Confesiones de un opiófilo",
      quote:
        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/300x400",
    },
    {
      id: "11",
      type: "book",
      className: "",
      title: "Confesiones de un opiófilo",
      detailHref: "#",
      quote:
        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/300x400",
    },
    {
      id: "12",
      type: "book",
      className: "",
      detailHref: "#",
      title: "Confesiones de un opiófilo",
      quote:
        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/300x400",
    },
  ]
};

const meta: Meta<typeof HomePage> = {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figspec",
      url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=283-707&t=acmeOqADvcdhZQZx-4"
    },
  },
  args: {
    featuredItems: [featuredItem as any],
    buttons: [
      { title: "Ver más", link: "/libros" },
    ],
    description: "Filósofo y ensayista español, dedicó su vida a explorar y desafiar las convenciones sociales."
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  }
};