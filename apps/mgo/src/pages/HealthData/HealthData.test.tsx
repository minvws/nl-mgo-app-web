import { type HealthUiSchemaProps } from '$/components/HealthUiSchema/HealthUiSchema';
import { HealthCategory } from '$/healthCategory';
import { useParamsData } from '$/routing';
import { useResourcesStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthData } from './HealthData';

vi.mock('$/routing/useParamsData/useParamsData');
vi.mock('../../components/HealthUiSchema/HealthUiSchema', () => {
    return {
        HealthUiSchema: ({ summary }: HealthUiSchemaProps) => (
            <div data-testid="ui-schema">isSummary: {`${!!summary}`}</div>
        ),
    };
});

const mockUseParamsData = useParamsData as MockedFunction<typeof useParamsData>;

beforeEach(() => {
    mockUseParamsData.mockReset();
});

test('can show the summary', async () => {
    mockUseParamsData.mockImplementationOnce(() => ({
        organization: undefined,
        healthCategory: HealthCategory.Medication,
        resource: faker.custom.resource(),
    }));

    setupWithAppProviders(<HealthData summary />);

    await waitFor(() =>
        expect(document.title).toContain(appMessage('hc_medication.heading_summary'))
    );
    const uiSchemaComponent = screen.getByTestId('ui-schema');
    expect(uiSchemaComponent).toHaveTextContent('isSummary: true');
});

test('can show all the details', async () => {
    mockUseParamsData.mockImplementationOnce(() => ({
        organization: undefined,
        healthCategory: HealthCategory.Medication,
        resource: faker.custom.resource(),
    }));

    setupWithAppProviders(<HealthData />);

    await waitFor(() =>
        expect(document.title).toContain(appMessage('hc_medication.heading_detail'))
    );
    const uiSchemaComponent = screen.getByTestId('ui-schema');
    expect(uiSchemaComponent).toHaveTextContent('isSummary: false');
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
        healthCategory: HealthCategory.Medication,
        resource: undefined,
    }));

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => undefined);

    setupWithAppProviders(<HealthData />);

    const heading = screen.getByRole('heading', {
        name: appMessage(`not_found.heading`),
        level: 1,
    });

    expect(heading).toBeVisible();
});
