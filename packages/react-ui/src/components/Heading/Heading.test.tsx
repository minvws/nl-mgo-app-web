import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';
import { faker } from '@faker-js/faker';
import { sizes } from './sizes';

test('renders as span by default', async () => {
    const props = {
        children: faker.lorem.sentence(),
        size: faker.helpers.arrayElement(sizes),
    };
    render(<Heading data-testid="test" {...props} />);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(props.children);
});
