import { Meta, StoryObj } from "@storybook/react";
import { FeaturedVideo } from ".";

const meta: Meta = {
      title: "Molecules/Featured Home/Video",
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
            publishedAt: { control: "text", description: "Publication date" },
            coverHref: {
                  control: "text",
                  description: "Image URL for the cover",
                  type: { name: "string", required: true },
            },
            hasPermission: {
                  control: "boolean",
                  defaultValue: true,
                  description: "If the user has permission to access",
            },
      },
      args: {
            title: "Sample Article Title",
            publishedAt: "2024-11-18",
            coverHref: "https://placehold.co/300x200",
            categories: [
                  { id: "1", singular_name: "Tecnología" },
                  { id: "2", singular_name: "Filosofía" },
            ],
            hasPermission: true,
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
      decorators: [
            (Story) => (
                  <div style={{ overflow: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
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