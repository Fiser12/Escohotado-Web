import { Meta, StoryObj } from "@storybook/react";
import { ArticleDetail } from ".";

const content = `<h1>Prueba Header 1</h1><h2>Prueba Header 2</h2><h3>Prueba Header 3</h3><h4>Prueba Header 4</h4><h5>Prueba Header 5</h5><h6>Prueba Header 6</h6><p>Body text de prueba</p><p><strong>Body text de prueba bold</strong></p><p><em>Body text de prueba italic</em></p><p><span style="text-decoration: underline">Body text de prueba underline</span></p><p><sup>Body text de prueba sup</sup></p><p><sub>Body text de prueba sub</sub></p><hr><blockquote>Cita con bloque</blockquote><ul class="list-bullet"><li value="1">Bullet list 1</li><li value="2">Bullet list 2</li><li value="3">Bullet list 3</li></ul><ol class="list-number"><li value="1">Number list 1</li><li value="2">Number list 2</li><li value="3">Number list 3</li></ol>`

const meta: Meta = {
    title: "Pages/Articles/Detail/Web",
    component: ArticleDetail,
    parameters: {
        layout: 'fullscreen',
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=683-1637&t=ywkogyBA7q9g27hy-4",
        },
        backgrounds: {
        },
    },
    argTypes: {
        title: { control: "text", description: "Title of the article" },
        author: { control: "text", description: "Author of the article" },
        textLink: { control: "text", description: "Text for the link" },
        coverHref: { control: "text", description: "Image URL for the cover" },
        publishedAt: { control: "text", description: "Publication date" },
        contentHtml: { control: "text", description: "HTML content of the article" },
    },
    args: {
        title: "Sample Article Title",
        author: "Sample Article Author",
        publishedAt: "2024-11-18",
        textLink: "Leer más",
        coverHref: "https://placehold.co/600x150",
        categories: [
            { id: "1", singular_name: "Tecnología" },
            { id: "2", singular_name: "Filosofía" },
        ],
        contentHtml: content,
    },
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
    },
};


