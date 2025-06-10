import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Fade } from './Fade';

type Story = StoryObj<typeof Fade>;
type StoryMeta = Meta<typeof Fade>;

export default {} satisfies StoryMeta;

function FadeStory() {
    const [isVisible, setIsVisible] = useState(false);

    const toggle = () => setIsVisible(!isVisible);

    return (
        <div>
            <Button className="mb-4" onClick={toggle}>
                Toggle isVisible: {`${isVisible}`}
            </Button>

            <Fade isVisible={isVisible}>
                <div className="max-w-[400px] bg-gray-200 p-10">
                    Laboriosam ducimus aliquam eum voluptates debitis architecto recusandae
                    accusamus eos cum asperiores. Porro cum ut odit illo porro dolorum consequuntur
                    impedit rem sequi id. Repellendus debitis sequi quo eius pariatur dicta eum
                    ipsum quas. Explicabo sunt eligendi occaecati odit dicta cupiditate non deleniti
                    eaque ullam illum. Fugit assumenda neque itaque delectus qui suscipit iure totam
                    officiis eligendi repellat iste.
                </div>
            </Fade>
        </div>
    );
}

export const Default: Story = {
    render: () => <FadeStory />,
};
