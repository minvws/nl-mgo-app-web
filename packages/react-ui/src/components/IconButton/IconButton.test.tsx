import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { IconButton } from './IconButton';
import { faker } from '@faker-js/faker';

test('render', async () => {
    const label = faker.lorem.word();
    render(<IconButton icon="close" aria-label={label} />);

    const element = screen.getByRole('button', {
        name: label,
    });
    expect(element).toBeVisible();
});
