import { render, screen } from '@testing-library/react';
import { test } from 'vitest';
import { Render } from './Render';

test('renders children', async () => {
    render(
        <Render>
            <span data-testid="test" />
        </Render>
    );

    screen.getByTestId('test');
});

test('renders children as function call', async () => {
    render(<Render id="test">{({ id }: { id: string }) => <span data-testid={id} />}</Render>);

    screen.getByTestId('test');
});
