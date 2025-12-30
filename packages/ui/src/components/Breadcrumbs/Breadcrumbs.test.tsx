import { faker } from '@faker-js/faker';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { BreadcrumbItem, BreadcrumbLinkProps, Breadcrumbs } from './Breadcrumbs';

const mockBreadcrumb = () => ({
    label: faker.lorem.word(),
    href: faker.internet.url(),
});

test('renders all breadcrumb items with links', async () => {
    const items = mockArray<BreadcrumbItem>({ min: 2, max: 6, factory: mockBreadcrumb });
    items.push({ label: faker.lorem.word() });
    render(<Breadcrumbs items={items} />);
    expect(await screen.findByRole('navigation')).toBeVisible();
    expect(await screen.findAllByRole('link')).toHaveLength(items.length - 1);
});

test('can render all breadcrumb items with a custom link component', async () => {
    const items = mockArray({ min: 2, max: 6, factory: mockBreadcrumb });
    const customLinkComponent = (props: BreadcrumbLinkProps) => (
        <a {...props} data-testid="test-link" />
    );
    render(<Breadcrumbs items={items} linkComponent={customLinkComponent} />);
    expect(await screen.findByRole('navigation')).toBeVisible();
    expect(await screen.findAllByTestId('test-link')).toHaveLength(items.length);
});
