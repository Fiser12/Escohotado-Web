import { Meta, StoryObj } from "@storybook/react";
import { FeaturedBook } from ".";

const meta: Meta = {
      title: "Molecules/Featured Home",
      component: FeaturedBook,
      parameters: {
            layout: "centered",
            design: {
                  type: "figspec",
                  url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=20-253&t=86NbURnw8wQ1i7kH-4"
            },
            backgrounds: {
                  default: "dark",
            },
      },
      argTypes: {
            title: {
                  control: "text",
                  description: "Title of the book",
                  type: { name: "string", required: true },
            },
            quote: {
                  control: "text",
                  description: "Quote from the book",
                  type: { name: "string", required: true },
            },
            author: {
                  control: "text",
                  description: "Author from the book",
                  type: { name: "string", required: true },
            },
            coverHref: {
                  control: "text",
                  description: "Image URL for the cover",
                  type: { name: "string", required: true },
            },
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Book: Story = {
      name: "Book",
      args: {
            title: "Rameras y esposas",
            quote: '"Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente."',
            author: '- Javier López, autor de "Pensamientos de un Alquimista"',
            coverHref: "https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas.png",
      }
};