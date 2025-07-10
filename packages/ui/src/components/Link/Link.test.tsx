import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';
import { variants } from './variants';

test('renders with with href and content', async () => {
    const content = faker.lorem.sentence();
    const href = faker.internet.url();
    const variant = faker.helpers.arrayElement(variants);

    render(
        <Link variant={variant} href={href}>
            {content}
        </Link>
    );

    expect(screen.getByRole('link', { name: content })).toHaveAttribute('href', href);
});
