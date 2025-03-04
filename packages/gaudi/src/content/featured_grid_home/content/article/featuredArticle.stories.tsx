import { Meta, StoryObj } from "@storybook/react";
import { FeaturedArticle } from ".";

const meta: Meta<typeof FeaturedArticle> = {
      title: "Molecules/Featured Home/Article",
      component: FeaturedArticle,
      parameters: {
            layout: "padded",
            design: {
                  type: "figspec",
                  url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=7-378&t=cXsMNPXvpF6IKIkc-4"
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
            author: {
                  control: "text",
                  description: "Author of the article",
                  type: { name: "string", required: false },
            },
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
            author: "Sample Author",
            coverHref: "https://placehold.co/400x400",
            categories: [
                  { id: 1, label: "Tecnología" },
                  { id: 2, label: "Filosofía" },
            ],
            hasPermission: true,
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
      decorators: [
            (Story) => (
                  <div style={{ height: '300px', overflow: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
};

export const Vertical: Story = {
      decorators: [
            (Story) => (
                  <div style={{ width: '300px', height: '400px', overflow: 'auto' }}>
                        <Story />
                  </div>
            ),
      ],
};