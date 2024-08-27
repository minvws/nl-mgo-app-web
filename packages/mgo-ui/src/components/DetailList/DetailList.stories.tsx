import type { Meta, StoryObj } from '@storybook/react';
import { DetailList } from './DetailList';
import { DetailListButton } from './DetailListButton';

type Story = StoryObj<typeof DetailList>;
type StoryMeta = Meta<typeof DetailList>;

export default {
    component: DetailList,
} satisfies StoryMeta;

export const Default: Story = {
    args: {
        children: [
            <DetailListButton
                key={1}
                title="DetailListButton"
                description="DetailListButton"
                icon="chevron-right"
            />,
            <DetailListButton
                key={2}
                title="DetailListButton"
                description="DetailListButton"
                icon="chevron-right"
                date="Vandaag"
            />,
        ],
    },
};

export const Line: Story = {
    args: {
        gap: 'line',
        children: [
            <DetailListButton
                key={1}
                title="DetailListButton"
                description="DetailListButton"
                icon="chevron-right"
            />,
            <DetailListButton
                key={2}
                title="DetailListButton"
                description="DetailListButton"
                icon="chevron-right"
                date="Gisteren"
            />,
        ],
    },
};
