import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

test('renders with with href and content', async () => {
    const content = faker.lorem.sentence();
    render(<Container data-testid="test">{content}</Container>);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(content);
});
