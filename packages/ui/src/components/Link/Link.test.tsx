import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
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

test('renders with an icon', async () => {
    const content = faker.lorem.sentence();
    const href = faker.internet.url();
    const variant = faker.helpers.arrayElement(variants);

    render(
        <Link variant={variant} href={href} iconRight="help">
            {content}
        </Link>
    );

    expect(screen.getByRole('link', { name: content })).toHaveAttribute('href', href);
    expect(screen.getByRole('link')).toContainHTML('<svg');
});
