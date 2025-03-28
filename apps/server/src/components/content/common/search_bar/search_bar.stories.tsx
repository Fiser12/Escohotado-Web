import { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from ".";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/Inputs",
  component: SearchBar,
  argTypes: {
    initialValue: {
      description: "Valor inicial del campo de búsqueda.",
      control: "text",
      type: { name: "string", required: false },
    },
    applyText: {
      description: "Función que se llama al enviar el texto ingresado.",
      action: "applied", // Permite simular la acción en Storybook
      type: { name: "function", required: true },
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figspec",
      url: "https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=420-1227&t=T6gQySPAwetTNvaR-4",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SearchBarComp: Story = {
  args: {
    initialValue: "",
  },

  name: "Search Bar",
};
