import type { Meta, StoryObj } from '@storybook/react';
import { useResponsive, type ResponsiveProp } from './useResponsive';

const ComponentWithResponsiveProp = (props: { readonly value: ResponsiveProp<number> }) => {
    const currentValue = useResponsive(props.value);
    return (
        <div className="text-md">
            Current value: <strong>{currentValue}</strong>
        </div>
    );
};

const ComponentWithHook = () => {
    const isSmallerThanLg = useResponsive({
        base: true,
        lg: false,
    });
    return (
        <div className="text-md">
            Current media width is smaller than <strong>large</strong>:{' '}
            <strong>{isSmallerThanLg.toString()}</strong>
        </div>
    );
};

export default {
    tags: ['!autodocs'],
    component: ComponentWithResponsiveProp,
    args: {
        value: {
            base: 1,
            md: 3,
            xl: 5,
        },
    },
    argTypes: { value: { control: 'object' } },
} satisfies Meta;

export const WithResponsiveProp: StoryObj = {};

export const SmallerThanLarge: StoryObj = {
    render: () => <ComponentWithHook />,
    argTypes: {
        value: {
            table: {
                disable: true,
            },
        },
    },
};
