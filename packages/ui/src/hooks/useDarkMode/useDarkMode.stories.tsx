import type { Meta, StoryObj } from '@storybook/react';
import { useDarkMode } from './useDarkMode';

const ComponentWithDarkModeValue = () => {
    const darkMode = useDarkMode();
    return (
        <div className="p-8 text-base dark:bg-gray-950 dark:text-white">
            dark mode is: <strong>{darkMode.toString()}</strong>
            <p className="my-4 text-base">
                Note: the hook does not work with the Storybook CSS Emulation of dark mode.
            </p>
        </div>
    );
};

type Story = StoryObj<typeof ComponentWithDarkModeValue>;
type StoryMeta = Meta<typeof ComponentWithDarkModeValue>;

export default {
    component: ComponentWithDarkModeValue,
} satisfies StoryMeta;

export const Default: Story = {};
