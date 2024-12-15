import { Meta, StoryObj } from "@storybook/react";
import { CarouselBook } from ".";

const booksExample = [
    { title: 'La conciencia infeliz', coverHref: 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', link: '/book1' },
    { title: 'El espíritu de la comedia', coverHref: 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', link: '/book2' },
    { title: 'De Physis a Polis', coverHref: 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', link: '/book3' },
    { title: 'Majestades, crímenes y víctimas', coverHref: 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', link: '/book4' },
    { title: 'Realidad y substancia', coverHref: 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', link: '/book5' },
    { title: 'La conciencia infeliz', coverHref: 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', link: '/book6' },
    { title: 'El espíritu de la comedia', coverHref: 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', link: '/book7' },
    { title: 'De Physis a Polis', coverHref: 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', link: '/book8' },
    { title: 'Majestades, crímenes y víctimas', coverHref: 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', link: '/book9' },
    { title: 'Realidad y substancia', coverHref: 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', link: '/book10' },
];

const meta: Meta = {
    title: "Organism/Carousel/Book",
    component: CarouselBook,
    args: {
        books: booksExample,
    },
    parameters: {
        layout: "fullscreen",
        design: {
            type: "figspec",
            url: ""
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
    parameters: {
        layout: "fullscreen",
    },
};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    }
};