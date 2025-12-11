import { HealthCategoryConfig } from '$/config';
import { useParamsData } from '$/routing';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { HealthUiSchema } from '@minvws/mgo-hcim-ui';
import { appMessage, testMessage } from '@minvws/mgo-intl/test/shared';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthData } from './HealthData';

vi.mock('$/intl');
vi.mock('$/routing/useParamsData/useParamsData');
vi.mock('$/hooks/useHealthUiSchema/useHealthUiSchema', () => {
    return {
        useHealthUiSchema: () => ({
            getSummary: () =>
                ({
                    label: 'summary',
                    children: [],
                }) as HealthUiSchema,
            getDetails: () =>
                ({
                    label: 'details',
                    children: [],
                }) as HealthUiSchema,
        }),
    };
});

const mockUseParamsData = useParamsData as MockedFunction<typeof useParamsData>;

beforeEach(() => {
    mockUseParamsData.mockReset();
});

test('can show the summary', async () => {
    const healthCategory = {
        heading: faker.lorem.word(),
    } as HealthCategoryConfig;

    mockUseParamsData.mockImplementation(() => ({
        organization: undefined,
        healthCategory,
        resource: faker.custom.resource(),
    }));

    setupWithAppProviders(<HealthData summary />);
    await waitFor(() => expect(document.title).toContain(testMessage(healthCategory.heading)));
    screen.getByRole('heading', { name: /summary/i });
});

test('can show the details', async () => {
    const healthCategory = {
        heading: faker.lorem.word(),
    } as HealthCategoryConfig;

    mockUseParamsData.mockImplementation(() => ({
        organization: undefined,
        healthCategory,
        resource: faker.custom.resource(),
    }));

    setupWithAppProviders(<HealthData />);
    await waitFor(() => expect(document.title).toContain(testMessage(healthCategory.heading)));
    screen.getByRole('heading', { name: /details/i });
});

test('shows not found page if healthcategory is not found', async () => {
    mockUseParamsData.mockImplementationOnce(() => ({
        organization: undefined,
        healthCategory: undefined,
        resource: faker.custom.resource(),
    }));

    setupWithAppProviders(<HealthData />);

    const heading = screen.getByRole('heading', {
        name: appMessage(`not_found.heading`),
        level: 1,
    });

    expect(heading).toBeVisible();
});

test('shows not found page if resource is not found', async () => {
    mockUseParamsData.mockImplementationOnce(() => ({
        organization: undefined,
        healthCategory: {
            heading: faker.lorem.word(),
        } as HealthCategoryConfig,
        resource: undefined,
    }));

    setupWithAppProviders(<HealthData />);

    const heading = screen.getByRole('heading', {
        name: appMessage(`not_found.heading`),
        level: 1,
    });

    expect(heading).toBeVisible();
});
