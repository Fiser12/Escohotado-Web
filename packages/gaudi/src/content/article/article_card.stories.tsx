import { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './article_card';

const meta: Meta = {
    title: 'Components/Card',
    component: ArticleCard,
    parameters: {
        layout: 'centered',
        design: {
            type: 'figspec',
            url: 'https://www.figma.com/files/xq1hrsTcwvQMgX49pwXGcc/Escohotado?node-id=683-1637&t=ywkogyBA7q9g27hy-4',
        }
    },
    argTypes: {
        title: { control: 'text', description: 'Title of the article' },
        textLink: { control: 'text', description: 'Text for the link' },
        coverHref: { control: 'text', description: 'Image URL for the cover' },
        href: { control: 'text', description: 'Link URL' },
        publishedAt: { control: 'text', description: 'Publication date' },
        hasPermission: {
            control: 'boolean',
            defaultValue: true,
            description: 'If the user has permission to access',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Article: Story = {
    name: 'Article',
    args: {
        title: 'Sample Article Title',
        publishedAt: '2024-11-18',
        textLink: 'Leer más',
        coverHref: 'https://via.placeholder.com/340x170',
        href: '',
        hasPermission: true,
        categories: [
            { id: '1', singular_name: 'Tecnología' },
            { id: '2', singular_name: 'Filosofía' },
        ],
    },
};
