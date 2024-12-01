import { Meta, StoryObj } from "@storybook/react";
import { ContentGridList } from ".";
import { ArticleCard, ContentWrapper } from "../../../server";

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
};
