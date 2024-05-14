import { type StoryObj } from '@storybook/react';

export default {
    title: 'documentation stories',
    tags: ['hideInSidebar'],
};

export const Typography: StoryObj = {
    render: () => {
        return (
            <div>
                <div className="font-sans text-[2.5rem] font-normal">
                    The quick brown fox jumps over the lazy dog
                </div>
                <div className="font-sans text-[2.5rem] font-bold">
                    The quick brown fox jumps over the lazy dog
                </div>
            </div>
        );
    },
};
