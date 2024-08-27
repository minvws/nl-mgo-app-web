import type { StoryObj } from '@storybook/react';
import { DescriptionList } from './DescriptionList';
import { DescriptionCard } from '../DescriptionCard/DescriptionCard';
import { DescriptionButton } from '../DescriptionButton/DescriptionButton';

type StoryArgs = { label: string; description: string; date: string };
type Story = StoryObj<StoryArgs>;

export default {
    component: DescriptionList,
    args: {
        label: 'Ab maxime',
        description: 'Facere enim similique illo ratione assumenda placeat quas.',
    },
};

export const Default: Story = {
    render: ({ label, description }) => (
        <DescriptionList>
            <DescriptionCard term={label} details={description} />
        </DescriptionList>
    ),
};

export const MultipleChildren: Story = {
    render: ({ label, description }) => (
        <DescriptionList>
            <DescriptionCard term={label} details={description} />
            <DescriptionCard term="Repellat" details="Distinctio" />
            <DescriptionCard term="Nobis" details="Dolore quis" />
            <DescriptionCard
                term="Nesciunt modi"
                details="Nemo nisi autem temporibus odio unde repudiandae sunt magnam
"
            />
            <DescriptionButton
                term="mattis"
                details="Et dapibus dolor pharetra sed"
                icon="chevron-right"
            />
        </DescriptionList>
    ),
};

export const WithListArray: Story = {
    render: ({ label, description }) => {
        const list = [
            {
                term: label,
                details: description,
            },
            {
                term: 'Repellat',
                details: 'distinctio',
            },
            {
                term: 'Nobis',
                details: 'Dolore quis',
            },
            {
                term: 'Nesciunt modi',
                details: 'Nemo nisi autem temporibus odio unde repudiandae sunt magnam',
            },
        ];

        return <DescriptionList list={list} />;
    },
};
