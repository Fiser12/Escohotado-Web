import { Meta, StoryObj } from "@storybook/react";
import { CommentCard } from ".";
import { ContentWrapper } from "../../../../layout/content-wrapper";
import { GridComments } from "./grid_comments";

const meta: Meta<typeof GridComments> = {
      title: "Organism/Details/CommentSection",
      component: GridComments,
      parameters: {
            layout: 'centered',
            design: {
                  type: 'figspec',
                  url: '',
            },
      },
      args: {
            items: [
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
            ],
            renderBox(item, index) {
                  const comment = item as { user: string, date: string, comment: string };
                  return <CommentCard
                        user={comment.user}
                        date={comment.date}
                        comment={comment.comment}
                        key={index}
                  />;
            },
      },
      render: (args) => (
            <ContentWrapper>
                  <GridComments {...args} />
            </ContentWrapper>
      ),
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
      }
};



