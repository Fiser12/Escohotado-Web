import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SearchModal, SearchedItem } from ".";
import { CategoryModel } from "hegel";

const tags: CategoryModel[] = [
  {
    id: 1,
    label: "Team"
  }
]

const defaultItems: SearchedItem[] = [
  {
    id: 1,
    icon: <span className="bg-gray-400 h-2 w-2 m-2 rounded-full" />,
    title: "Tighten Co.",
    tags: tags,
    href: "#"
  },
  {
    id: 2,
    icon: <span className="bg-green-400 h-2 w-2 m-2 rounded-full" />,
    title: "Taylor Otwell",
    tags: tags,
    href: "#"
  },
  {
    id: 3,
    icon: <span className="bg-gray-400 h-2 w-2 m-2 rounded-full" />,
    title: "Adam Wathan",
    tags: [],
    href: "#"
  },
  {
    id: 4,
    icon: <span className="bg-gray-400 h-2 w-2 m-2 rounded-full" />,
    title: "Duke Street Studio Inc.",
    tags: tags,
    href: "#"
  },
  {
    id: 5,
    icon: <span className="bg-green-400 h-2 w-2 m-2 rounded-full" />,
    title: "Jeffrey Wey",
    tags: tags,
    href: "#"
  },
];

const meta: Meta<typeof SearchModal> = {
  title: "Molecules/Modals",
  component: SearchModal,
  args: {
    secondsDelay: 0.5,
    onType: (value: string) => {
      console.log("Search:", value);
    },
    onTagClick: (tag: CategoryModel) => {

    },
    items: defaultItems,
  },
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figspec",
      url: "https://www.figma.com/file/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=440-6646&m=dev",
    },
  },
} satisfies Meta<typeof SearchModal>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  name: "Search",
};
