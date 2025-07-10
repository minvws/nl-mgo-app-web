import { flushCallStack } from '@minvws/mgo-utils';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Fade } from './Fade';

test('Fade can be open and closed', async () => {
    const { rerender } = render(
        <Fade>
            <div data-testid="test-content" />
        </Fade>
    );

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();

    rerender(
        <Fade isVisible>
            <div data-testid="test-content" />
        </Fade>
    );

    expect(screen.queryByTestId('test-content')).toBeInTheDocument();

    rerender(
        <Fade>
            <div data-testid="test-content" />
        </Fade>
    );

    await flushCallStack(2);

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
});
