import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { SearchForm } from './SearchForm';

type Story = StoryObj<typeof SearchForm>;
type StoryMeta = Meta<typeof SearchForm>;

export default {
    component: SearchForm,
    args: {
        placeholder: 'Zoeken',
    },
    argTypes: {
        placeholder: {
            control: 'text',
        },
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ ...args }) => {
        const [query, setQuery] = useState(''); // eslint-disable-line react-hooks/rules-of-hooks
        return (
            <div>
                <div className="mb-4 text-[12px] text-gray-500">Current search query: {query}</div>
                <SearchForm {...args} value={query} onChange={setQuery} />
            </div>
        );
    },
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack>
                <SearchForm {...args} />
            </Stack>
        </DarkStory>
    ),
};
