import { Meta, StoryObj } from "@storybook/react";
import { ContentGridList } from ".";
import { ArticleCard, BookCard, ContentWrapper } from "../../../server";

const meta: Meta<typeof ContentGridList> = {
    title: "Components/Containers/Content Grid",
    component: ContentGridList,
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
        },
    }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ArticlesList: Story = {
    name: "ArticlesList",
    args: {
        items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        renderBox: (_, index) => <ArticleCard
            key={index}
            title={`Article ${index}`}
            href={"#"}
            publishedAt={"2024-11-21T12:00:00.000Z"}
            coverHref={"https://placehold.co/600x400"}
            textLink={index % 2 == 0 ? "Descargar" : "Leer más"}
            categories={[
                { id: "1", singular_name: "Antonio Escohotado" },
                { id: "2", singular_name: "Libertad" },
            ]}
            hasPermission={index % 2 != 0}
        />
    },
    render: (args) => (
        <ContentWrapper>
            <ContentGridList {...args} />
        </ContentWrapper>
    ),
}

export const BooksList: Story = {
    name: "BooksList",
    args: {
        items: [
            {url: "https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp", title: "De Physis a Polis"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-600x600.png", title: "La conciencia infeliz"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-600x600.png", title: "El espíritu de la comedia"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-600x600.png", title: "Majestades, crímenes y víctimas"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-600x600.png", title: "Realidad y substancia"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Senta-Semanas-en-el-Tropico-600x600.png", title: "Senta semanas en el trópico"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/HG-de-las-drogas-II-600x600.png", title: "Historia general de las drogas II"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/HG-de-las-drogas-I-1-600x600.png", title: "Historia general de las drogas I"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Aprendiendo-de-las-drogas-600x600.png", title: "Aprendiendo de las drogas"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Historia-elemental-de-las-drogas-600x600.png", title: "Historia elemental de las drogas"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Retrato-del-libertino-600x600.png", title: "Retrato del libertino"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Rameras-y-esposas-600x600.png", title: "Rameras y esposas"}, 
            {url: "https://laemboscadura.com/wp-content/uploads/Caos-y-orden-edicion-impresa.png", title: "Caos y orden"},
        ],
        renderBox: (item, index) => {
            const libro = item as {url: string, title: string};
            return <BookCard
                key={index}
                title={libro.title}
                coverHref={libro.url}
                link={"#"}
            />
        }
    },
    render: (args) => (
        <ContentWrapper>
            <ContentGridList {...args} />
        </ContentWrapper>
    ),
};
