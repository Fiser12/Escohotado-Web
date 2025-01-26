import { Meta, StoryObj } from "@storybook/react";
import { VideoDetail } from ".";

const comments = [
    {
        user: "Juan Pérez",
        date: "2024-11-21",
        comment: "¡Excelente artículo! Muy informativo. Me gustó cómo abordaste el tema con tanta profundidad y claridad. Espero ver más contenido de este tipo en el futuro.",
    },
    {
        user: "María López",
        date: "2024-11-22",
        comment: "No estoy de acuerdo con algunos puntos mencionados, especialmente en lo que respecta a la interpretación de los datos. Sería interesante ver una comparación con otras fuentes para tener una perspectiva más completa.",
    },
    {
        user: "Carlos Sánchez",
        date: "2024-11-23",
        comment: "Gracias por compartir esta información. He estado investigando sobre este tema durante un tiempo y tus aportes me han ayudado a entender mejor los conceptos clave. ¡Sigue así!",
    },
    {
        user: "Lucía Gómez",
        date: "2024-11-24",
        comment: "Interesante perspectiva, lo consideraré en mis próximos proyectos. Me gustaría saber más sobre cómo aplicaste estas técnicas en casos reales. ¿Tienes ejemplos adicionales que puedas compartir?",
    },
];

const meta: Meta = {
    title: "Pages/Videos/Detail",
    component: VideoDetail,
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
    },
    args: {
        title: "Sample Article Title",
        author: "Sample Article Author",
        publishedAt: "2024-11-18",
        duration: "",
        videoHref: "https://www.youtube.com/watch?v=mV-4JUWcAC4",
        categories: [
            { id: "1", singular_name: "Tecnología" },
            { id: "2", singular_name: "Filosofía" },
        ],
        commentsSectionModel: {
            comments,
            forumTopicId: "1234",
        }
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


