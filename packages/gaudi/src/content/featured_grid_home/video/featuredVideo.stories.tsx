import { Meta, StoryObj } from "@storybook/react";
import { FeaturedVideo } from ".";

const meta: Meta = {
      title: "Molecules/Featured Home",
      component: FeaturedVideo,
      parameters: {
            layout: "padded",
            design: {
                  type: "figspec",
                  url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=3-131&t=GjytMCl0EqfNmyGe-4"
            },
            backgrounds: {
                  default: "dark",
            },
      },
      argTypes: {
            title: {
                  control: "text",
                  description: "Title of the article",
                  type: { name: "string", required: true },
            },
            coverHref: {
                  control: "text",
                  description: "Image URL for the cover",
                  type: { name: "string", required: true },
            },
      },
      args: {
            title: "Sample Article Title",
            coverHref: "https://placehold.co/300x200",
            categories: [
                  { id: "1", singular_name: "Tecnología" },
                  { id: "2", singular_name: "Filosofía" },
            ],
      },
      decorators: [
            (Story) => (
                  <div style={{ maxWidth: '600px', margin: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Video: Story = {
};