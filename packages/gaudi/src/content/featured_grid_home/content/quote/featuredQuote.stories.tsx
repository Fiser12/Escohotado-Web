import { Meta, StoryObj } from "@storybook/react";
import { FeaturedQuote } from ".";

const meta: Meta = {
      title: "Molecules/Featured Home/Quote",
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
            layout: "padded",
            design: {
                  type: "figspec",
                  url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=34-551&t=cXsMNPXvpF6IKIkc-4"
            },
      },
      args: {
            quote: '"Las drogas no son ni buenas ni malas, son sustancias que pueden usarse bien o mal, y el único antídoto real contra su mal uso es la educación."',
            author: "Caos y Orden",
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
      decorators: [
            (Story) => (
                  <div style={{ height: '350px', overflow: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
};

export const Vertical: Story = {
      decorators: [
            (Story) => (
                  <div style={{ width: '350px', overflow: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
};