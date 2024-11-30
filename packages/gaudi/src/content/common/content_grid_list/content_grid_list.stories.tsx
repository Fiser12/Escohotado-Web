import { Meta, StoryObj } from "@storybook/react";
import { ContentGridList } from ".";
import { TagIcon } from "../../../common/icons/tag_icon";
import { PenIcon } from "../../../common/icons/pen_icon";
import { ArticleCard } from "../../../server";

const meta: Meta<typeof ContentGridList> = {
    title: "Containers/ContentGridList",
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

export const ArticlesGridList: Story = {
    name: "ArticlesGridList",
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
        <ContentGridList {...args} />
    ),
};
