import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Input } from './Input';

test('renders an input', async () => {
    render(<Input name={faker.word.sample()} />);

    const element = await screen.findByRole('textbox');
    expect(element).toBeVisible();
});

test('renders an invalid input', async () => {
    render(<Input name={faker.word.sample()} invalid />);

    const element = await screen.findByRole('textbox');
    expect(element).toHaveAttribute('aria-invalid', 'true');
});
