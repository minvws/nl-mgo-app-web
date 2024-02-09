import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

test('renders with content', async () => {
    const content = faker.lorem.sentence();
    render(<Stack data-testid="test">{content}</Stack>);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(content);
});
