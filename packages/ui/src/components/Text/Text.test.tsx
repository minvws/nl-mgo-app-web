import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';
import { faker } from '@faker-js/faker';
import { sizes } from './sizes';
import { variants } from './variants';

test('renders as span by default', async () => {
    const props = {
        children: faker.lorem.sentence(),
        size: faker.helpers.arrayElement(sizes),
        variant: faker.helpers.arrayElement(variants),
    };
    render(<Text data-testid="test" {...props} />);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(props.children);
});
