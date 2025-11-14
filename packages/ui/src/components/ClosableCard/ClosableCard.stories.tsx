import type { Meta, StoryObj } from '@storybook/react';
import { useOpenState } from '../../hooks';
import { Button } from '../Button/Button';
import { DarkStory } from '../DarkStory/DarkStory';
import { Stack } from '../Stack/Stack';
import { ClosableCard } from './ClosableCard';

type Story = StoryObj<typeof ClosableCard>;
type StoryMeta = Meta<typeof ClosableCard>;

export default {
    component: ClosableCard,
} satisfies StoryMeta;

export const Default: Story = {
    render: function InteractiveRender() {
        const { isOpen, toggle, close } = useOpenState({
            defaultOpen: true,
        });

        return (
            <>
                <Button onClick={toggle} className="mb-6">
                    Toggle isOpen: {`${isOpen}`}
                </Button>

                <ClosableCard title="Lorem ipsum dolor" isOpen={isOpen} onClose={close}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt.
                </ClosableCard>
            </>
        );
    },
};

export const LongContent: Story = {
    render: function InteractiveRender() {
        const { isOpen, toggle, close } = useOpenState({
            defaultOpen: true,
        });

        return (
            <>
                <Button onClick={toggle} className="mb-6">
                    Toggle isOpen: {`${isOpen}`}
                </Button>

                <ClosableCard title="Lorem ipsum dolor" isOpen={isOpen} onClose={close}>
                    <p className="mb-4">
                        Laudantium repellendus nihil expedita magni laborum deserunt eos totam
                        aliquam ipsa porro fuga illo odio. Asperiores officiis quo blanditiis fuga
                        veritatis labore voluptatum facilis. In aperiam deserunt dignissimos modi
                        debitis inventore consequuntur eum officia. Ipsam necessitatibus tempora
                        expedita in debitis minima ut repellat omnis. Fugiat modi atque ipsa
                        asperiores eligendi voluptas sint impedit quas ut veritatis esse incidunt
                        dolorum.
                    </p>
                    <p>
                        Eius asperiores minus quia totam aliquid aliquam impedit repellat ullam.
                        Eveniet consequuntur neque quasi sapiente explicabo necessitatibus sint rem
                        repellat soluta porro quos eos. Nesciunt minima quasi explicabo fugit
                        ducimus explicabo iusto incidunt rerum sequi voluptatum atque esse.
                        Repudiandae mollitia exercitationem maiores omnis laudantium ullam quas.
                        Voluptatibus animi natus nemo similique laudantium maiores dolores maiores
                        magni vero adipisci.
                    </p>
                </ClosableCard>
            </>
        );
    },
};

export const Overview: Story = {
    render: function OverviewRender() {
        const { isOpen, toggle, close } = useOpenState({
            defaultOpen: true,
        });

        return (
            <DarkStory>
                <Button onClick={toggle} className="mb-6">
                    Toggle isOpen: {`${isOpen}`}
                </Button>

                <Stack>
                    <ClosableCard title="Lorem ipsum dolor" isOpen={isOpen} onClose={close}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt.
                    </ClosableCard>
                </Stack>
            </DarkStory>
        );
    },
};
