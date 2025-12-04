import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { suppressConsoleError } from '$test/helpers/suppressConsoleError';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthCategoryGrid } from './HealthCategoryGrid';
import { appMessage } from '@minvws/mgo-intl/test/shared';

const hoisted = vi.hoisted(() => ({
    useHealthCategoriesQuery: vi.fn(),
    useMainHealthCategoriesWithSlugs: vi.fn(),
}));

vi.mock('$/hooks', () => ({
    useHealthCategoriesQuery: hoisted.useHealthCategoriesQuery,
}));

vi.mock('$/hooks/useMainHealthCategoriesWithSlugs/useMainHealthCategoriesWithSlugs', () => ({
    useMainHealthCategoriesWithSlugs: hoisted.useMainHealthCategoriesWithSlugs,
}));

test('throws error when query not found for category', () => {
    const categoryId = faker.string.uuid();
    const mainCategories = [
        {
            id: categoryId,
            heading: faker.lorem.word(),
            categories: [
                {
                    id: categoryId,
                    heading: faker.lorem.word(),
                    subheading: faker.lorem.word(),
                },
            ],
        },
    ];

    hoisted.useMainHealthCategoriesWithSlugs.mockReturnValue(mainCategories);
    hoisted.useHealthCategoriesQuery.mockReturnValue([]);

    suppressConsoleError(() => {
        expect(() => {
            setupWithAppProviders(<HealthCategoryGrid organizations={[]} />);
        }).toThrow(`Query not found for category ${categoryId}`);
    });
});

test('renders categories when queries are found', () => {
    const categoryId = faker.string.uuid();
    const mainCategories = [
        {
            id: 'health',
            heading: 'mhc_health.heading',
            categories: [
                {
                    id: categoryId,
                    heading: 'hc_allergies.heading',
                    subheading: 'hc_allergies.subheading',
                },
            ],
        },
    ];

    hoisted.useMainHealthCategoriesWithSlugs.mockReturnValue(mainCategories);
    hoisted.useHealthCategoriesQuery.mockReturnValue([
        {
            category: {
                id: categoryId,
                heading: 'hc_allergies.heading',
                subheading: 'hc_allergies.subheading',
                subcategories: [],
            },
            isLoading: false,
            isEmpty: false,
            isError: false,
            retry: vi.fn(),
        },
    ]);

    setupWithAppProviders(<HealthCategoryGrid organizations={[]} />);

    expect(
        screen.getByRole('heading', { name: new RegExp(appMessage('hc_allergies.heading')) })
    ).toBeVisible();
});
