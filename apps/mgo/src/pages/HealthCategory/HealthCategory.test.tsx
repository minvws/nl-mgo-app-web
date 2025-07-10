import { HealthCategory as HealthCategoryEnum, useHealthCategoryQuery } from '$/healthCategory';
import { type HealthCategoryData } from '$/healthCategory/useHealthCategoryData/useHealthCategoryData';
import { Navigate, useParamsData } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, within } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthCategory } from './HealthCategory';

vi.mock('$/routing/useParamsData/useParamsData');
vi.mock('$/routing/Navigate');

const mockUseParamsData = useParamsData as MockedFunction<typeof useParamsData>;
const mockNavigate = Navigate as MockedFunction<typeof Navigate>;
const mockUseHealthCategoryQuery = useHealthCategoryQuery as MockedFunction<
    typeof useHealthCategoryQuery
>;

vi.mock('$/healthCategory', async (importOriginal) => {
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
    mockUseParamsData.mockImplementation(() => ({
        organization: undefined,
        healthCategory: HealthCategoryEnum.Medication,
        resource: undefined,
    }));

    const store = useOrganizationsStore.getState();
    const mock = vi.spyOn(store, 'getOrganizationBySlug');
    mock.mockImplementation(() => faker.custom.healthcareOrganization());
    mockUseHealthCategoryQuery.mockReset();
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

test('applies an organization filter if there is one', async () => {
    const organization = faker.custom.healthcareOrganization();
    mockUseParamsData.mockImplementation(() => ({
        organization,
        healthCategory: HealthCategoryEnum.Medication,
        resource: undefined,
    }));
    setupWithAppProviders(<HealthCategory />);
    expect(mockUseHealthCategoryQuery).toHaveBeenCalledWith('medication', [organization.id]);
});
test('does not apply an organization filter if there is no organization slug', async () => {
    setupWithAppProviders(<HealthCategory />);
    expect(mockUseHealthCategoryQuery).toHaveBeenCalledWith('medication', undefined);
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

test('redirects to the overview page if the organization was not found', async () => {
    mockUseParamsData.mockImplementation(() => ({
        organizationSlug: faker.lorem.slug(),
        organization: undefined,
        healthCategory: HealthCategoryEnum.Medication,
        resource: undefined,
    }));

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
