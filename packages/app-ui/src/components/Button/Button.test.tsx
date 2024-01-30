import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { variants } from './variants';

test('renders a button with a label', async () => {
    const props = {
        label: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.label);
    expect(screen.getByRole('button')).not.toBeDisabled();
});

test('renders a disabled button with a label', async () => {
    const props = {
        label: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        disabled: true,
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.label);
    expect(screen.getByRole('button')).toBeDisabled();
});
