import { Meta, StoryObj } from "@storybook/react";
import { Typo } from "./Typographies";

const meta: Meta<typeof Typo> = {
    title: "Atoms/Typography",
    parameters: {
        layout: "centered",
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
    name: "H1",
    render: () => (
        <div className="space-y-4">
            <Typo.H1>H1 Regular</Typo.H1>
            <Typo.H1 blackMode>H1 Black Mode</Typo.H1>
        </div>
    ),
};

export const H2: Story = {
    name: "H2",
    render: () => (
        <div className="space-y-4">
            <Typo.H2>H2 Regular</Typo.H2>
            <Typo.H2 blackMode>H2 Black Mode</Typo.H2>
        </div>
    ),
};

export const H3: Story = {
    name: "H3",
    render: () => (
        <div className="space-y-4">
            <Typo.H3>H3 Regular</Typo.H3>
            <Typo.H3 blackMode>H3 Black Mode</Typo.H3>
        </div>
    ),
};

export const H4: Story = {
    name: "H4",
    render: () => (
        <div className="space-y-4">
            <Typo.H4>H4 Regular</Typo.H4>
            <Typo.H4 blackMode>H4 Black Mode</Typo.H4>
        </div>
    ),
}; 


export const QuoteBig: Story = {
    name: "QuoteBig",
    render: () => (
        <Typo.QuoteBig>QuoteBig Regular</Typo.QuoteBig>
    ),
};

export const QuoteSmall: Story = {
    name: "QuoteSmall",
    render: () => (
        <Typo.QuoteSmall>QuoteSmall Regular</Typo.QuoteSmall>
    ),
};
