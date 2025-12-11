import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Heading } from './Heading';
import { sizes } from './sizes';

test('renders content', async () => {
    const props = {
        children: faker.lorem.sentence(),
        size: faker.helpers.arrayElement(sizes),
    };
    render(<Heading data-testid="test" {...props} />);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(props.children);
});
