import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card/Card';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { ListWrapper } from './ListWrapper';

type Story = StoryObj<typeof ListWrapper>;
type StoryMeta = Meta<typeof ListWrapper>;

export default {
    component: ListWrapper,
} satisfies StoryMeta;

export const Default: Story = {
    render: () => (
        <ListWrapper>
            <Card>Item 1</Card>
            <Card>Item 2</Card>
        </ListWrapper>
    ),
};

export const Line: Story = {
    render: () => (
        <ListWrapper gap="line">
            <Card>Item 1</Card>
            <Card>Item 2</Card>
        </ListWrapper>
    ),
};

export const Overview: Story = {
    render: () => (
        <DarkStory>
            <Stack>
                <ListWrapper>
                    <Card>Item 1</Card>
                    <Card>Item 2</Card>
                </ListWrapper>

                <ListWrapper gap="line">
                    <Card>Item 1</Card>
                    <Card>Item 2</Card>
                </ListWrapper>
            </Stack>
        </DarkStory>
    ),
};
