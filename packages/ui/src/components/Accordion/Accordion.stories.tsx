import type { Meta, StoryObj } from '@storybook/react';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { Accordion } from './Accordion';

type Story = StoryObj<typeof Accordion>;
type StoryMeta = Meta<typeof Accordion>;

export default {
    component: Accordion,
} satisfies StoryMeta;

export const Default: Story = {
    render: () => (
        <Accordion>
            <Accordion.Button>Debitis similique fuga</Accordion.Button>
            <Accordion.Panel>
                <p className="mb-4">
                    Illo asperiores eius vero placeat iste amet porro dolor. Laudantium consequatur
                    architecto ex aliquam et asperiores tempore architecto vel saepe. Dolor rem esse
                    officiis totam laborum reprehenderit fugit commodi sapiente consectetur.
                    Officiis et error ut corporis numquam debitis eius. Repellendus et animi maxime
                    tempore omnis placeat illum ea accusamus minima.
                </p>
                <p>
                    Sed et minima repudiandae laboriosam nobis magni placeat. Quis facilis unde iste
                    omnis quas atque distinctio consequuntur ea earum. Nostrum blanditiis doloribus
                    magnam cumque corporis saepe commodi perferendis ullam deleniti iure nesciunt
                    occaecati dicta. Facere explicabo ea sequi ullam saepe tenetur rerum animi minus
                    qui. Ratione nemo possimus rerum cumque quae excepturi cum vel eos facilis
                    distinctio vel.
                </p>
            </Accordion.Panel>
        </Accordion>
    ),
};

export const DefaultExpanded: Story = {
    render: () => (
        <Accordion defaultExpanded>
            <Accordion.Button>Debitis similique fuga</Accordion.Button>
            <Accordion.Panel>
                <p className="mb-4">
                    Illo asperiores eius vero placeat iste amet porro dolor. Laudantium consequatur
                    architecto ex aliquam et asperiores tempore architecto vel saepe. Dolor rem esse
                    officiis totam laborum reprehenderit fugit commodi sapiente consectetur.
                    Officiis et error ut corporis numquam debitis eius. Repellendus et animi maxime
                    tempore omnis placeat illum ea accusamus minima.
                </p>
                <p>
                    Sed et minima repudiandae laboriosam nobis magni placeat. Quis facilis unde iste
                    omnis quas atque distinctio consequuntur ea earum. Nostrum blanditiis doloribus
                    magnam cumque corporis saepe commodi perferendis ullam deleniti iure nesciunt
                    occaecati dicta. Facere explicabo ea sequi ullam saepe tenetur rerum animi minus
                    qui. Ratione nemo possimus rerum cumque quae excepturi cum vel eos facilis
                    distinctio vel.
                </p>
            </Accordion.Panel>
        </Accordion>
    ),
};

export const Overview: Story = {
    render: () => (
        <DarkStory orientation="horizontal">
            <Stack>
                <Accordion>
                    <Accordion.Button>Debitis similique fuga</Accordion.Button>
                    <Accordion.Panel>
                        <p>
                            Illo asperiores eius vero placeat iste amet porro dolor. Laudantium
                            consequatur architecto ex aliquam et asperiores tempore architecto vel
                            saepe.
                        </p>
                    </Accordion.Panel>
                </Accordion>
                <Accordion defaultExpanded>
                    <Accordion.Button>Debitis similique fuga</Accordion.Button>
                    <Accordion.Panel>
                        <p>
                            Illo asperiores eius vero placeat iste amet porro dolor. Laudantium
                            consequatur architecto ex aliquam et asperiores tempore architecto vel
                            saepe.
                        </p>
                    </Accordion.Panel>
                </Accordion>
            </Stack>
        </DarkStory>
    ),
};
