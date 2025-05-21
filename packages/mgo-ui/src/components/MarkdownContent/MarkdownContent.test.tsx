import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MarkdownContent } from './MarkdownContent';

test('renders as span by default', async () => {
    const props = {
        children: faker.lorem.sentence(),
    };
    render(<MarkdownContent data-testid="test" {...props} />);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(props.children);
});
