import type { Meta, StoryObj } from '@storybook/react';
import { List } from '.';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';

type Story = StoryObj<typeof List>;
type StoryMeta = Meta<typeof List>;

export default {
    component: List,
    args: {
        children: [
            <List.Item key="1">
                Consequuntur ipsa facere eligendi repudiandae possimus nesciunt porro odit in
                deserunt iure commodi vitae delectus. Dicta repudiandae dolore repudiandae porro
                numquam harum labore assumenda veritatis fugit quod. Quidem quos animi soluta nemo
                aperiam iste molestiae qui perspiciatis labore iure. Neque fugit aut nesciunt minus
                quod quis rerum sit laudantium ex. Cumque deserunt pariatur ipsam aut amet quidem
                occaecati porro magni quod perferendis vitae.
            </List.Item>,
            <List.Item key="2">
                Excepturi corporis veritatis dolorem laboriosam neque molestias beatae vero minima
                consectetur quaerat nihil asperiores nisi. Aliquam blanditiis sequi corporis
                quibusdam esse natus officia officiis. Tenetur itaque ut veritatis incidunt natus
                distinctio adipisci. Veniam quibusdam eveniet dolorem quasi eaque quod consequatur
                et praesentium blanditiis. Labore quae nam rerum ipsa dolorum rerum corporis nihil
                vero quae fuga accusamus nihil.
            </List.Item>,
        ],
    },
} satisfies StoryMeta;

export const Default: Story = {};

export const WithIcon: Story = {
    args: {
        children: [
            <List.Item key="1">
                <List.Icon icon="encrypted" />
                Corrupti eveniet ipsum odit voluptatibus natus veritatis minima consectetur
                pariatur. Doloremque hic repellendus inventore repellendus fugit voluptate officiis
                commodi. Quis harum atque delectus alias quod pariatur nobis nulla dignissimos
                repellat.
            </List.Item>,
            <List.Item key="2">
                <List.Icon icon="health_and_safety" />
                Nulla expedita ad placeat assumenda facilis officia deleniti.
            </List.Item>,
        ],
    },
};

export const Overview: Story = {
    render: ({ ...args }) => (
        <DarkStory>
            <Stack className="gap-20">
                <List {...args}>
                    <List.Item key="1">
                        Consequuntur ipsa facere eligendi repudiandae possimus nesciunt porro odit
                        in deserunt iure commodi vitae delectus.
                    </List.Item>

                    <List.Item key="2">
                        Excepturi corporis veritatis dolorem laboriosam neque molestias beatae vero
                        minima consectetur quaerat nihil asperiores nisi.
                    </List.Item>
                </List>
                <List {...args}>
                    <List.Item key="1">
                        <List.Icon icon="encrypted" />
                        Corrupti eveniet ipsum odit voluptatibus natus veritatis minima consectetur
                        pariatur.
                    </List.Item>

                    <List.Item key="2">
                        <List.Icon icon="health_and_safety" />
                        Nulla expedita ad placeat assumenda facilis officia deleniti.
                    </List.Item>
                </List>
            </Stack>
        </DarkStory>
    ),
};
