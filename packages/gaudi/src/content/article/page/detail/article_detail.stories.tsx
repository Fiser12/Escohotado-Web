import { Meta, StoryObj } from "@storybook/react";
import { ArticleDetail } from "./article_detail";

const meta: Meta = {
    title: "Articles/Pages/Detail",
    component: ArticleDetail,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=683-1637&t=ywkogyBA7q9g27hy-4",
        },
        backgrounds: {
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the article" },
        textLink: { control: "text", description: "Text for the link" },
        coverHref: { control: "text", description: "Image URL for the cover" },
        publishedAt: { control: "text", description: "Publication date" },
        hasPermission: {
            control: "boolean",
            defaultValue: true,
            description: "If the user has permission to access",
        },
        contentHtml: { control: "text", description: "HTML content of the article" },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    name: "Article",
    args: {
        title: "Sample Article Title",
        publishedAt: "2024-11-18",
        textLink: "Leer más",
        coverHref: "https://via.placeholder.com/600x150",
        hasPermission: false,
        categories: [
            { id: "1", singular_name: "Tecnología" },
            { id: "2", singular_name: "Filosofía" },
        ],
        contentHtml: `<h1>Prueba Header 1</h1><h2>Prueba Header 2</h2><h3>Prueba Header 3</h3><h4>Prueba Header 4</h4><h5>Prueba Header 5</h5><p>Body text de prueba</p><hr><h6>Prueba Header 6</h6><blockquote>Cita con bloque</blockquote><ul class="list-bullet"><li value="1">Bullet list 1</li><li value="2">Bullet list 2</li></ul><p>Temp</p><ol class="list-number"><li value="1">Number list 1</li><li value="2">Number list 2</li></ol><picture><source srcset="https://via.placeholder.com/600x150" media="(max-width: 300px)" type="image/png"><img src="https://via.placeholder.com/600x150" alt="Image" width="432" height="670"></picture><p></p>`
    },
};
