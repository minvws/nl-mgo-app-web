import { flushCallStack } from '@minvws/mgo-mgo-utils';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SlideDown } from './SlideDown';

test('SlideDown can be open and closed', async () => {
    const { rerender } = render(
        <SlideDown isDown={false}>
            <div data-testid="test-content" />
        </SlideDown>
    );

    let content = screen.queryByTestId('test-content');
    expect(content).not.toBeInTheDocument();

    rerender(
        <SlideDown isDown>
            <div data-testid="test-content" />
        </SlideDown>
    );

    content = screen.queryByTestId('test-content');
    expect(content).toBeInTheDocument();

    rerender(
        <SlideDown isDown={false}>
            <div data-testid="test-content" />
        </SlideDown>
    );

    await flushCallStack(2);

    content = screen.queryByTestId('test-content');
    expect(content).not.toBeInTheDocument();
});
