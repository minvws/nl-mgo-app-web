import { faker } from '@faker-js/faker';
import { flushCallStack } from '@minvws/mgo-utils';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Collapse } from './Collapse';

test('Collapse can be open and closed', async () => {
    const content = faker.lorem.sentence();

    const getWrapperHeight = () =>
        (screen.getByTestId('test').parentNode! as HTMLElement).style.height;

    const { rerender } = render(
        <Collapse expanded={false} data-testid="test">
            {content}
        </Collapse>
    );

    expect(getWrapperHeight()).toBe('0px');

    rerender(
        <Collapse expanded data-testid="test">
            {content}
        </Collapse>
    );

    await flushCallStack(3);
    expect(getWrapperHeight()).toBe('auto'); //

    rerender(
        <Collapse expanded={false} data-testid="test">
            {content}
        </Collapse>
    );

    await flushCallStack(3);
    expect(getWrapperHeight()).toBe('0px');
});
