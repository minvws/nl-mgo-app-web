import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { SlideDown } from './SlideDown';

type Story = StoryObj<typeof SlideDown>;
type StoryMeta = Meta<typeof SlideDown>;
export default {} satisfies StoryMeta;

function Story() {
    const [isDown, setIsDown] = useState(false);

    const toggle = () => setIsDown(!isDown);

    return (
        <div>
            <Button onClick={toggle}>Toggle isDown: {`${isDown}`}</Button>

            <div className="mt-4 border-b-2" />

            <SlideDown isDown={isDown} onEnter={action('on-enter')} onExited={action('on-exited')}>
                <div className="max-w-[400px] bg-gray-200 p-10">
                    Laboriosam ducimus aliquam eum voluptates debitis architecto recusandae
                    accusamus eos cum asperiores. Porro cum ut odit illo porro dolorum consequuntur
                    impedit rem sequi id. Repellendus debitis sequi quo eius pariatur dicta eum
                    ipsum quas. Explicabo sunt eligendi occaecati odit dicta cupiditate non deleniti
                    eaque ullam illum. Fugit assumenda neque itaque delectus qui suscipit iure totam
                    officiis eligendi repellat iste.
                </div>
            </SlideDown>
        </div>
    );
}

export const Default: Story = {
    render: () => <Story />,
};
