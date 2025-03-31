import { Meta, StoryObj } from "@storybook/react";
import { BookCard } from ".";

const meta: Meta<typeof BookCard> = {
      title: "Molecules/GridCards/Book",
      component: BookCard,
      parameters: {
            layout: "padded",
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
      args: {
            title: "Rameras y esposas",
            quote: '"Una exploración profunda y provocadora de la mente humana. Filosofía y psicodelia se entrelazan magistralmente."',
            author: '- Javier López, autor de "Pensamientos de un Alquimista"',
            coverHref: "https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas.png",
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
};

export const Vertical: Story = {
      decorators: [
            (Story) => (
                  <div style={{ width: '300px', overflow: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
};