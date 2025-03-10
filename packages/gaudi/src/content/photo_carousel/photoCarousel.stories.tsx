import { Meta, StoryObj } from "@storybook/react"
import { PhotoCarousel } from "."
import { ContentWrapper } from "../../common/content_wrapper/content_wrapper";

//Prueba photos
const photoUrlEven = 'https://picsum.photos/200/200?random=1';
const photoUrlOdd = 'https://picsum.photos/200/200?random=2';
const photos = Array.from({ length: 20 }, (_, index) =>
      index % 2 === 0 ? photoUrlEven : photoUrlOdd
);

const meta: Meta<typeof PhotoCarousel> = {
      title: "Organism/Photo Carousel",
      component: PhotoCarousel,
      args: {
            items: photos.map((photoHref, i) => ({
                  title: `Esto es un título ${i}`,
                  description: "Esto es una descripcion",
                  year: 1945,
                  photoHref
            })),
      }
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
      decorators: [
            (Story) => (
                  <ContentWrapper className="overflow-hidden">
                        <Story />
                  </ContentWrapper>
            ),
      ],
      parameters: {
            backgrounds: {
              default: 'Gray',
            },
      },
};

export const Mobile: Story = {
      parameters: {
            viewport: {
                  defaultViewport: 'iphonex',
            },
      },
};