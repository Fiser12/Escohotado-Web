import { Meta, StoryObj } from "@storybook/react";
import { FeaturedArticle } from ".";

const meta: Meta = {
      title: "Molecules/Featured Home",
      component: FeaturedArticle,
      parameters: {
            layout: "centered",
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
      },
      args: {
            title: "Sample Article Title",
            author: "Sample Author",
            coverHref: "https://placehold.co/200x200",
            categories: [
                  { id: "1", singular_name: "Tecnología" },
                  { id: "2", singular_name: "Filosofía" },
            ],
      },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Article: Story = {
};