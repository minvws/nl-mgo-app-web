import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { sizes } from './sizes';
import { Text } from './Text';

test('renders content', async () => {
    const props = {
        children: faker.lorem.sentence(),
        size: faker.helpers.arrayElement(sizes),
    };
    render(<Text data-testid="test" {...props} />);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(props.children);
});
