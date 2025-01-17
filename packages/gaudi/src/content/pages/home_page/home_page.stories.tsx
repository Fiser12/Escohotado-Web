import { Meta, StoryObj } from "@storybook/react";
import { HomePage } from ".";
const featuredItems = [
    {
      id: "1",
      type: "article",
      className: "col-span-1 md:col-span-2 lg:col-span-3",
      title: "El origen de la civilización",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/150x150",
      href: "/",
      categories: [
        { id: "1", singular_name: "Historia" },
        { id: "2", singular_name: "Filosofía" },
      ],
    },
    {
      id: "2",
      type: "quote",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      quote:
        "La libertad no es algo que se nos dé, sino algo que conquistamos; no es una gracia ni un privilegio, sino una responsabilidad. Ser libre significa asumir la propia vida con todas sus consecuencias, sin delegar en otros las decisiones fundamentales, y sin buscar excusas en el destino o en la sociedad. Solo quien es capaz de enfrentarse a sus miedos y contradicciones puede aspirar a la libertad.",
      author: "Antonio Escohotado",
    },
    {
      id: "3",
      type: "book",
      className: "col-span-1 md:col-span-2",
      title: "Confesiones de un opiófilo",
      quote:
        "Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente.",
      author: "Antonio Escohotado",
      coverHref: "https://placehold.co/150x200",
    },
    {
      id: "4",
      type: "video",
      className: "col-span-1 md:col-span-2",
      title: "250.000 agradecimientos escohotadianos a todos los emboscados",
      coverHref: "https://placehold.co/300x200",
      href: "/",
      categories: [
        { id: "1", singular_name: "Historia" },
        { id: "2", singular_name: "Filosofía" },
      ],
    }
  ];
  
const meta: Meta = {
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
            featuredItems,
            gridClassnames: "grid-cols-1 md:grid-cols-4",
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