import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Spinner } from './Spinner';
import { variants } from './variants';

test('renders hidden by default', async () => {
    const props = {
        variant: faker.helpers.arrayElement(variants),
    };
    render(<Spinner {...props} />);

    expect(screen.getByTestId('spinner')).toBeVisible();
});

test('renders as progressbar when given an aria-label', async () => {
    const props = {
        ['aria-label']: 'Bezig met laden...',
        variant: faker.helpers.arrayElement(variants),
    };
    render(<Spinner {...props} />);

    expect(screen.getByRole('progressbar')).toBeVisible();
});
