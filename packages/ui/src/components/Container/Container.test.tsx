import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

test('renders with content', async () => {
    const content = faker.lorem.sentence();
    render(<Container data-testid="test">{content}</Container>);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(content);
});

test('renders with centeredContent', async () => {
    const content = faker.lorem.sentence();
    render(
        <Container data-testid="test" centeredContent>
            {content}
        </Container>
    );

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(content);
});
