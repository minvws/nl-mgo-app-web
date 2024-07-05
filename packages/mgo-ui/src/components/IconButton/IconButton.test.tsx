import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { IconButton } from './IconButton';
import { faker } from '@faker-js/faker';
import { sizes } from './sizes';

test('render', async () => {
    const label = faker.lorem.word();
    render(<IconButton icon="close" aria-label={label} size={faker.helpers.arrayElement(sizes)} />);

    const element = screen.getByRole('button', {
        name: label,
    });
    expect(element).toBeVisible();
});
