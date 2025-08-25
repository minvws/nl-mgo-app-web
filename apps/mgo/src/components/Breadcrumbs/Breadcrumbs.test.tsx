import { setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { faker } from '$test/faker';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { uniqueId } from 'lodash';
import { Breadcrumbs } from './Breadcrumbs';
import { useBreadcrumbs } from './useBreadcrumbs';

vi.mock('./useBreadcrumbs', () => ({
    useBreadcrumbs: vi.fn(),
}));

const mockBreadcrumb = () => ({
    label: uniqueId(faker.lorem.word()),
    href: faker.internet.url(),
});

test('Breadcrumbs renders null if there are no breadcrumbs', () => {
    vi.mocked(useBreadcrumbs).mockReturnValue([]);

    setupWithAppProviders(<Breadcrumbs />);

    const navElement = screen.queryByRole('navigation');
    expect(navElement).toBeNull();
});

test('Breadcrumbs renders with a single breadcrumb', () => {
    const breadCrumb = mockBreadcrumb();
    vi.mocked(useBreadcrumbs).mockReturnValue([breadCrumb]);

    setupWithAppProviders(<Breadcrumbs />);

    const navElement = screen.queryByRole('navigation');
    expect(navElement).not.toBeNull();

    const breadcrumbText = screen.getByText(breadCrumb.label);
    expect(breadcrumbText).toBeInTheDocument();

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);

    const chevrons = document.querySelectorAll('svg');
    expect(chevrons).toHaveLength(0);
});

test('Breadcrumbs last item is not clickable and has no chevron after it', () => {
    const breadcrumbs = mockArray({ min: 2, max: 6, factory: mockBreadcrumb });

    vi.mocked(useBreadcrumbs).mockReturnValue(breadcrumbs);

    setupWithAppProviders(<Breadcrumbs />);

    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    const testResourceSpan = screen.getByText(lastBreadcrumb.label);
    expect(testResourceSpan.tagName.toLowerCase()).toBe('span');

    const testResourceLink = screen.queryByRole('link', { name: lastBreadcrumb.label });
    expect(testResourceLink).toBeNull();

    const lastItem = testResourceSpan.closest('li');
    const chevronInLastItem = (lastItem as HTMLElement).querySelector('svg');
    expect(chevronInLastItem).toBeNull();
});

test('Breadcrumbs renders correct paths', () => {
    const breadcrumbs = mockArray({ min: 2, max: 6, factory: mockBreadcrumb });

    vi.mocked(useBreadcrumbs).mockReturnValue(breadcrumbs);

    setupWithAppProviders(<Breadcrumbs />);

    const links = screen.queryAllByRole('link');
    expect(links.length).toBe(breadcrumbs.length - 1);

    links.forEach((link, index) => {
        expect(link).toHaveTextContent(breadcrumbs[index].label);
    });

    const chevrons = document.querySelectorAll('svg');
    expect(chevrons.length).toBe(breadcrumbs.length - 1);
});
