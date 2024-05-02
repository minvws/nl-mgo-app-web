import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { config } from 'react-transition-group';
import { type TransitionProps } from 'react-transition-group/Transition';
import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import { flushCallStack } from '../../../test/flushCallstack';
import { Collapse } from './Collapse';

beforeAll(() => {
    config.disabled = false;
});

afterAll(() => {
    config.disabled = true;
});

vi.mock('react-transition-group', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const { Transition, ...rest } = await importOriginal<typeof import('react-transition-group')>();
    const MockTransition = (props: TransitionProps) => <Transition {...props} timeout={0} />;

    return {
        ...rest,
        Transition: MockTransition,
    };
});

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
