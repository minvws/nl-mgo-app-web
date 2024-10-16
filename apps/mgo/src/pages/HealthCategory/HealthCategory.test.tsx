import {
    HealthCategory as HealthCategoryEnum,
    healthCategorySlugs,
    useHealthCategoryQuery,
} from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { Navigate, useParams } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { messageRegexp } from '$test/helpers/i18n';
import { screen } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthCategory } from './HealthCategory';

vi.mock('$/routing/useParams');
vi.mock('$/routing/Navigate');

const mockUseParams = useParams as MockedFunction<typeof useParams>;
const mockNavigate = Navigate as MockedFunction<typeof Navigate>;
const mockUseHealthCategoryQuery = useHealthCategoryQuery as MockedFunction<
    typeof useHealthCategoryQuery
>;

vi.mock('$/healthCategory', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importOriginal<typeof import('$/healthCategory')>(); // type is inferred
    const useHealthCategoryQuery = vi.fn(() => ({
        data: {},
        isLoading: false,
    }));

    return {
        ...mod,
        useHealthCategoryQuery,
    };
});

beforeEach(() => {
    mockUseParams.mockImplementation(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategoryEnum.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationBySlug');
    mock.mockImplementation(() => faker.custom.healthcareOrganization());
});

test('loads and shows category content', async () => {
    mockUseHealthCategoryQuery.mockImplementation(() => ({
        id: faker.string.uuid(),
        category: HealthCategoryEnum.Medication,
        isLoading: true,
        isError: false,
        isEmpty: false,
        data: null,
    }));

    const { rerender } = setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: messageRegexp(`health_category.${HealthCategoryEnum.Medication}`),
        level: 1,
    });

    expect(screen.getByRole('progressbar')).toBeVisible();

    mockUseHealthCategoryQuery.mockImplementation(() => ({
        id: faker.string.uuid(),
        category: HealthCategoryEnum.Medication,
        isLoading: false,
        isError: false,
        isEmpty: false,
        data: {
            medicationUse: [],
            medicationAgreements: [],
            administrationAgreements: [],
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    rerender(<HealthCategory />);
    screen.getByRole('heading', {
        name: messageRegexp('health_category.medication.medication_use'),
        level: 2,
    });
});

test('loads and receives error from category query', async () => {
    mockUseHealthCategoryQuery.mockImplementation(() => ({
        id: faker.string.uuid(),
        category: HealthCategoryEnum.Medication,
        isLoading: false,
        isError: true,
        isEmpty: false,
        data: {
            medicationUse: [],
            medicationAgreements: [],
            administrationAgreements: [],
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: messageRegexp(`health_category.${HealthCategoryEnum.Medication}`),
        level: 1,
    });

    expect(screen.getByRole('alert')).toBeVisible();
});

test('loads and receives no data from category query', async () => {
    mockUseHealthCategoryQuery.mockImplementation(() => ({
        id: faker.string.uuid(),
        category: HealthCategoryEnum.Medication,
        isLoading: false,
        isError: false,
        isEmpty: true,
        data: {
            medicationUse: [],
            medicationAgreements: [],
            administrationAgreements: [],
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: messageRegexp(`health_category.${HealthCategoryEnum.Medication}`),
        level: 1,
    });

    screen.getByRole('heading', {
        name: messageRegexp('health_category.empty.heading'),
        level: 2,
    });
});

test('redirects to the overview page if the organisation was not found', async () => {
    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationBySlug');
    mock.mockImplementation(() => undefined);

    setupWithAppProviders(<HealthCategory />);

    expect(mockNavigate.mock.calls[0][0]).toEqual({
        to: `/overzicht`,
    });
});
