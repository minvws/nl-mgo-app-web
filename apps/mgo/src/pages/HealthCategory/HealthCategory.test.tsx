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
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, within } from '@testing-library/react';
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
        name: appMessage(`hc_${HealthCategoryEnum.Medication}.heading`),
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
            medicationUse: {
                label: 'health_category.medication.medication_use',
                data: [],
            },
            medicationAgreements: {
                label: 'health_category.medication.medication_agreements',
                data: [],
            },
            administrationAgreements: {
                label: 'health_category.medication.administration_agreements',
                data: [],
            },
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    rerender(<HealthCategory />);
    screen.getByRole('heading', {
        name: appMessage('health_category.medication.medication_use'),
        level: 2,
    });
});

test('does not apply an organization filter if there is no organisation slug', async () => {
    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationBySlug');
    mock.mockImplementation(() => undefined);

    mockUseParams.mockImplementation(() => ({
        organizationSlug: undefined,
        healthCategorySlug: healthCategorySlugs[HealthCategoryEnum.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    setupWithAppProviders(<HealthCategory />);

    expect(mockUseHealthCategoryQuery).toHaveBeenCalledWith('medication', undefined);
});

test('shows not found page if healthcategory is not found', async () => {
    mockUseParams.mockImplementation(() => ({
        organizationSlug: undefined,
        healthCategorySlug: 'foobar',
        resourceSlug: faker.lorem.slug(),
    }));

    setupWithAppProviders(<HealthCategory />);

    const heading = screen.getByRole('heading', {
        name: appMessage(`not_found.heading`),
        level: 1,
    });

    expect(heading).toBeVisible();
});

test('loads and receives error from category query', async () => {
    mockUseHealthCategoryQuery.mockImplementation(() => ({
        id: faker.string.uuid(),
        category: HealthCategoryEnum.Medication,
        isLoading: false,
        isError: true,
        isEmpty: false,
        data: {
            medicationUse: {
                label: 'health_category.medication.medication_use',
                data: [],
            },
            medicationAgreements: {
                label: 'health_category.medication.medication_agreements',
                data: [],
            },
            administrationAgreements: {
                label: 'health_category.medication.administration_agreements',
                data: [],
            },
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: appMessage(`hc_${HealthCategoryEnum.Medication}.heading`),
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
            medicationUse: {
                label: 'health_category.medication.medication_use',
                data: [],
            },
            medicationAgreements: {
                label: 'health_category.medication.medication_agreements',
                data: [],
            },
            administrationAgreements: {
                label: 'health_category.medication.administration_agreements',
                data: [],
            },
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    setupWithAppProviders(<HealthCategory />);

    screen.getByRole('heading', {
        name: appMessage(`hc_${HealthCategoryEnum.Medication}.heading`),
        level: 1,
    });

    screen.getByRole('heading', {
        name: appMessage('health_category.empty.heading'),
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

test('invalidates queries when clicking retry button', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    mockUseHealthCategoryQuery.mockImplementationOnce(() => ({
        id: faker.string.uuid(),
        category: HealthCategoryEnum.Medication,
        isLoading: false,
        isError: true,
        isEmpty: true,
        data: {
            medicationUse: {
                label: 'health_category.medication.medication_use',
                data: [],
            },
            medicationAgreements: {
                label: 'health_category.medication.medication_agreements',
                data: [],
            },
            administrationAgreements: {
                label: 'health_category.medication.administration_agreements',
                data: [],
            },
        } as HealthCategoryData<typeof HealthCategoryEnum.Medication>,
    }));

    const spy = vi.spyOn(queryClient, 'invalidateQueries');
    const { user } = setupWithAppProviders(
        <QueryClientProvider client={queryClient}>
            <HealthCategory />
        </QueryClientProvider>
    );

    const alert = screen.getByRole('alert');
    expect(alert).toBeVisible();

    const button = within(alert).getByRole('button', { name: 'Probeer opnieuw' });
    await user.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
        queryKey: [HealthCategoryEnum.Medication],
    });
});
