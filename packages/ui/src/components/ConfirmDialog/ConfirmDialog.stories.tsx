import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { useOpenState } from '../../hooks';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';
import { ConfirmDialog } from './ConfirmDialog';

type Story = StoryObj<typeof ConfirmDialog.Content>;
type StoryMeta = Meta<typeof ConfirmDialog.Content>;

export default {
    component: ConfirmDialog.Content,
    args: {
        title: 'Inventore quae delectus eveniet consectetur aspernatur?',
        description: 'Ab fugit officiis dolore esse quia voluptatem voluptatibus sapiente.',
        confirmButtonText: 'Accusamus dicta',
        cancelButtonText: 'Cupiditate',
        onConfirm: action('on-confirm'),
    },
} satisfies StoryMeta;

export const Default: Story = {
    render: ({ ...args }) => {
        return (
            <ConfirmDialog.Root>
                <ConfirmDialog.Trigger asChild>
                    <Button>Open</Button>
                </ConfirmDialog.Trigger>

                <ConfirmDialog.Content {...args} />
            </ConfirmDialog.Root>
        );
    },
};

export const OnlyConfirm: Story = {
    render: ({ ...args }) => {
        args.cancelButtonText = undefined;

        return (
            <div>
                <ConfirmDialog.Root>
                    <ConfirmDialog.Trigger asChild>
                        <Button>Open</Button>
                    </ConfirmDialog.Trigger>

                    <ConfirmDialog.Content {...args} />
                </ConfirmDialog.Root>
            </div>
        );
    },
};

export const ControlledWithLoading: Story = {
    render: ({ ...args }) => {
        const { isOpen, open, close, setIsOpen } = useOpenState(); // eslint-disable-line react-hooks/rules-of-hooks
        const triggerRef = useRef<HTMLButtonElement>(null); // eslint-disable-line react-hooks/rules-of-hooks
        const [loading, setLoading] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks

        return (
            <div>
                <Link asChild>
                    <button ref={triggerRef} onClick={open}>
                        Open
                    </button>
                </Link>

                <ConfirmDialog.Root open={isOpen} onOpenChange={setIsOpen}>
                    <ConfirmDialog.Content
                        {...args}
                        onCloseAutoFocus={() => triggerRef.current?.focus()}
                        onConfirm={async (event) => {
                            event.preventDefault(); // don't close the dialog automatically
                            setLoading(true);
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                            setLoading(false);
                            close();
                        }}
                        loading={loading}
                        loadingTextScreenReader="We are loading"
                    />
                </ConfirmDialog.Root>
            </div>
        );
    },
};
