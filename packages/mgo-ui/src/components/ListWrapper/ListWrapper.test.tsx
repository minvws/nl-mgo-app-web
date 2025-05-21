import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Card } from '../Card/Card';
import { ListWrapper } from './ListWrapper';
import { gaps } from './gap';

test.each(gaps)('renders listWrapper with gap `%s` with attributes', async (gap) => {
    render(<ListWrapper data-testid="test-list" gap={gap} />);
    expect(await screen.findByTestId('test-list')).toBeVisible();
});

test('render with child', async () => {
    render(
        <ListWrapper>
            <Card>test</Card>
        </ListWrapper>
    );
});
