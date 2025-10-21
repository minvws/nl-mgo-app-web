import type { Meta, StoryObj } from '@storybook/react';
import { useOpenState } from '../../hooks';
import { Button } from '../Button/Button';
import { Collapsible } from './Collapsible';

type Story = StoryObj<typeof Collapsible>;
type StoryMeta = Meta<typeof Collapsible>;
export default {} satisfies StoryMeta;

function CollapsibleStory() {
    const { isOpen, toggle } = useOpenState();

    return (
        <div>
            <Button onClick={toggle}>Toggle isOpen: {`${isOpen}`}</Button>

            <div className="mt-4 border-b-2" />

            <Collapsible isOpen={isOpen}>
                <div className="max-w-[400px] bg-gray-200 p-10">
                    Laboriosam ducimus aliquam eum voluptates debitis architecto recusandae
                    accusamus eos cum asperiores. Porro cum ut odit illo porro dolorum consequuntur
                    impedit rem sequi id. Repellendus debitis sequi quo eius pariatur dicta eum
                    ipsum quas. Explicabo sunt eligendi occaecati odit dicta cupiditate non deleniti
                    eaque ullam illum. Fugit assumenda neque itaque delectus qui suscipit iure totam
                    officiis eligendi repellat iste.
                </div>
            </Collapsible>
        </div>
    );
}

export const Default: Story = {
    render: () => <CollapsibleStory />,
};
