import { faker } from '@faker-js/faker';
import { flushCallStack } from '@minvws/mgo-utils';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Collapsible } from './Collapsible';

test('Collapsible can be open and closed', async () => {
    const content = faker.lorem.sentence();

    const getWrapperHeight = () =>
        (screen.getByTestId('test').parentNode! as HTMLElement).style.height;

    const { rerender } = render(
        <Collapsible isOpen={false} data-testid="test">
            {content}
        </Collapsible>
    );

    expect(getWrapperHeight()).toBe('0px');

    rerender(
        <Collapsible isOpen data-testid="test">
            {content}
        </Collapsible>
    );

    await flushCallStack(3);
    expect(getWrapperHeight()).toBe('auto'); //

    rerender(
        <Collapsible isOpen={false} data-testid="test">
            {content}
        </Collapsible>
    );

    await flushCallStack(3);
    expect(getWrapperHeight()).toBe('0px');
});
