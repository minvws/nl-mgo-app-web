import { getHealthCategoryConfigs } from '$/config';
import { HealthCategoryQuery } from '$/hooks/useHealthCategoriesQuery/useHealthCategoriesQuery';
import { Navigate, useParamsData } from '$/routing';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage, AppMessagesIds } from '@minvws/mgo-intl/test/shared';
import { screen, within } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthCategory } from './HealthCategory';

const healthCategories = getHealthCategoryConfigs();

vi.mock('$/routing/useParamsData/useParamsData');
vi.mock('$/routing/Navigate');

const mockUseParamsData = useParamsData as MockedFunction<typeof useParamsData>;
const mockNavigate = Navigate as MockedFunction<typeof Navigate>;

const hoisted = vi.hoisted(() => ({
    useHealthCategoriesQuery:
        vi.fn<
            (typeof import('$/hooks/useHealthCategoriesQuery/useHealthCategoriesQuery'))['useHealthCategoriesQuery']
        >(),
}));

vi.mock('$/hooks', async (importOriginal) => {
    const mod = await importOriginal<typeof import('$/hooks')>();

    return {
        ...mod,
        useHealthCategoriesQuery: hoisted.useHealthCategoriesQuery,
    };
});

beforeEach(() => {
    mockUseParamsData.mockImplementation(() => ({
        organization: undefined,
        healthCategory: healthCategories[0],
        resource: undefined,
    }));

    hoisted.useHealthCategoriesQuery.mockImplementation(() => [
        {
            category: mockHealthCategoryWithResources(),
            isLoading: false,
            isError: false,
            isEmpty: false,
            retry: vi.fn(),
        },
    ]);
});

function mockHealthCategoryWithResources(): HealthCategoryQuery['category'] {
    return {
        ...healthCategories[0],
        subcategories: healthCategories[0].subcategories.map((subcategory) => ({
            ...subcategory,
            resources: [],
        })),
    };
}

test('show loading state', async () => {
    const healthCategoryQuery = {
        category: mockHealthCategoryWithResources(),
        isLoading: true,
        isError: false,
        isEmpty: false,
        retry: vi.fn(),
    };

    hoisted.useHealthCategoriesQuery.mockImplementation(() => [healthCategoryQuery]);

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: appMessage(healthCategoryQuery.category.heading as AppMessagesIds),
        level: 1,
    });

    expect(screen.getByRole('progressbar')).toBeVisible();
});

test('shows category content', async () => {
    const healthCategoryQuery = {
        category: mockHealthCategoryWithResources(),
        isLoading: false,
        isError: false,
        isEmpty: false,
        retry: vi.fn(),
    };

    hoisted.useHealthCategoriesQuery.mockImplementation(() => [healthCategoryQuery]);

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: appMessage(healthCategoryQuery.category.heading as AppMessagesIds),
        level: 1,
    });

    screen.getByRole('heading', {
        name: appMessage(healthCategoryQuery.category.subcategories[0].heading as AppMessagesIds),
        level: 2,
    });
});

test('applies an organization filter if there is one', async () => {
    const organization = faker.custom.healthcareOrganization();
    mockUseParamsData.mockImplementation(() => ({
        organization,
        healthCategory: healthCategories[0],
        resource: undefined,
    }));

    setupWithAppProviders(<HealthCategory />);
    expect(hoisted.useHealthCategoriesQuery).toHaveBeenCalledWith({
        categories: [healthCategories[0]],
        organizations: [organization],
    });
});

test('does not apply an organization filter if there is no organization slug', async () => {
    setupWithAppProviders(<HealthCategory />);
    expect(hoisted.useHealthCategoriesQuery).toHaveBeenCalledWith({
        categories: [healthCategories[0]],
        organizations: [],
    });
});

test('shows not found page if healthcategory is not found', async () => {
    mockUseParamsData.mockImplementation(() => ({
        organization: undefined,
        healthCategory: undefined,
        resource: undefined,
    }));

    setupWithAppProviders(<HealthCategory />);

    const heading = screen.getByRole('heading', {
        name: appMessage(`not_found.heading`),
        level: 1,
    });

    expect(heading).toBeVisible();
});

test('shows category query error', async () => {
    const healthCategoryQuery = {
        category: mockHealthCategoryWithResources(),
        isLoading: false,
        isError: true,
        isEmpty: false,
        retry: vi.fn(),
    };
    hoisted.useHealthCategoriesQuery.mockImplementation(() => [healthCategoryQuery]);

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: appMessage(healthCategoryQuery.category.heading as AppMessagesIds),
        level: 1,
    });

    expect(screen.getByRole('alert')).toBeVisible();
});

test('shows category empty', async () => {
    const healthCategoryQuery = {
        category: mockHealthCategoryWithResources(),
        isLoading: false,
        isError: false,
        isEmpty: true,
        retry: vi.fn(),
    };
    hoisted.useHealthCategoriesQuery.mockImplementation(() => [healthCategoryQuery]);

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: appMessage(healthCategoryQuery.category.heading as AppMessagesIds),
        level: 1,
    });

    screen.getByRole('heading', {
        name: appMessage('health_category.empty.heading'),
        level: 2,
    });
});

test('redirects to the overview page if the organization was not found', async () => {
    mockUseParamsData.mockImplementation(() => ({
        organizationSlug: faker.lorem.slug(),
        organization: undefined,
        healthCategory: healthCategories[0],
        resource: undefined,
    }));

    setupWithAppProviders(<HealthCategory />);

    expect(mockNavigate.mock.calls[0][0]).toEqual({
        to: `/overzicht`,
    });
});

test('invalidates queries when clicking retry button', async () => {
    const healthCategoryQuery = {
        category: mockHealthCategoryWithResources(),
        isLoading: false,
        isError: true,
        isEmpty: false,
        retry: vi.fn(),
    };
    hoisted.useHealthCategoriesQuery.mockImplementation(() => [healthCategoryQuery]);

    const { user } = setupWithAppProviders(<HealthCategory />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeVisible();

    const button = within(alert).getByRole('button', { name: appMessage('common.try_again') });
    await user.click(button);

    expect(healthCategoryQuery.retry).toHaveBeenCalledTimes(1);
});
