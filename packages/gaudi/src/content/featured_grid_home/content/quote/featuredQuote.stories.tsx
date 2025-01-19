import { Meta, StoryObj } from "@storybook/react";
import { FeaturedQuote } from ".";

const meta: Meta = {
      title: "Molecules/Featured Home",
      component: FeaturedQuote,
      argTypes: {
            quote: {
                  description: "Quote to display",
                  control: "text",
                  type: { name: "string", required: true },
            },
            author: {
                  description: "Author of the quote",
                  control: "text",
                  type: { name: "string", required: true },
            },
      },
      parameters: {
            layout: "centered",
            design: {
                  type: "figspec",
                  url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=34-551&t=cXsMNPXvpF6IKIkc-4"
            },
      },
      decorators: [
            (Story) => (
                  <div style={{ maxWidth: '300px', height: '300px' }}>
                        <Story />
                  </div>
            ),
      ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Quote: Story = {
      name: "Quote",
      args: {
            quote: '"Las drogas no son ni buenas ni malas, son sustancias que pueden usarse bien o mal, y el único antídoto real contra su mal uso es la educación."',
            author: "Caos y Orden",
      }
};