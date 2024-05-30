import type { StoryObj } from '@storybook/react';
import { DescriptionList } from './DescriptionList';

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
            <DescriptionList.Term>{label}</DescriptionList.Term>
            <DescriptionList.Details>{description}</DescriptionList.Details>
        </DescriptionList>
    ),
};

export const MultipleChildren: Story = {
    render: ({ label, description }) => (
        <DescriptionList>
            <DescriptionList.Term>{label}</DescriptionList.Term>
            <DescriptionList.Details>{description}</DescriptionList.Details>

            <DescriptionList.Term>Repellat</DescriptionList.Term>
            <DescriptionList.Details>Distinctio</DescriptionList.Details>

            <DescriptionList.Term>Nobis</DescriptionList.Term>
            <DescriptionList.Details>Dolore quis</DescriptionList.Details>

            <DescriptionList.Term>Nesciunt modi</DescriptionList.Term>
            <DescriptionList.Details>
                Nemo nisi autem temporibus odio unde repudiandae sunt magnam
            </DescriptionList.Details>
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
