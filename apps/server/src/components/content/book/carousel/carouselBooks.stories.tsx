import { Meta, StoryObj } from "@storybook/react";
import { CarouselBook } from ".";
import { generateMockBook } from "@/components/mockData/book.model";

const books = [
    generateMockBook('La conciencia infeliz', 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', '/book1'),
    generateMockBook('El espíritu de la comedia', 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', '/book2'),
    generateMockBook('De Physis a Polis', 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', '/book3'),
    generateMockBook('Majestades, crímenes y víctimas', 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', '/book4'),
    generateMockBook('Realidad y substancia', 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', '/book5'),
    generateMockBook('La conciencia infeliz', 'https://laemboscadura.com/wp-content/uploads/La-conciencia-infeliz-300x300.png', '/book6'),
    generateMockBook('El espíritu de la comedia', 'https://laemboscadura.com/wp-content/uploads/El-espiritu-de-la-comedia-300x300.png', '/book7'),
    generateMockBook('De Physis a Polis', 'https://laemboscadura.com/wp-content/uploads/De-Physis-a-Polis.webp', '/book8'),
    generateMockBook('Majestades, crímenes y víctimas', 'https://laemboscadura.com/wp-content/uploads/Majestades-Crimenes-y-Victimas-300x300.png', '/book9'),
    generateMockBook('Realidad y substancia', 'https://laemboscadura.com/wp-content/uploads/Realidad-y-Substancia-300x300.png', '/book10'),
];

const meta: Meta<typeof CarouselBook> = {
    title: "Organism/Carousel/Book",
    component: CarouselBook,
    args: {
        books: books,
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