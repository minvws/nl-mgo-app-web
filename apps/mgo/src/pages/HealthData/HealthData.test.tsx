import { type HealthUiSchemaProps } from '$/components/HealthUiSchema/HealthUiSchema';
import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { useParams } from '$/routing';
import { useResourcesStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-mgo-intl/test';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthData } from './HealthData';

vi.mock('$/routing/useParams');
vi.mock('../../components/HealthUiSchema/HealthUiSchema', () => {
    return {
        HealthUiSchema: ({ summary }: HealthUiSchemaProps) => (
            <div data-testid="ui-schema">isSummary: {`${!!summary}`}</div>
        ),
    };
});

const mockUseParams = useParams as MockedFunction<typeof useParams>;

beforeEach(() => {
    mockUseParams.mockReset();
});

test('can show the summary', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => faker.custom.resource());

    setupWithAppProviders(<HealthData summary />);

    await waitFor(() =>
        expect(document.title).toContain(appMessage('hc_medication.heading_summary'))
    );
    const uiSchemaComponent = screen.getByTestId('ui-schema');
    expect(uiSchemaComponent).toHaveTextContent('isSummary: true');
});

test('can show all the details', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => faker.custom.resource());

    setupWithAppProviders(<HealthData />);

    await waitFor(() =>
        expect(document.title).toContain(appMessage('hc_medication.heading_detail'))
    );
    const uiSchemaComponent = screen.getByTestId('ui-schema');
    expect(uiSchemaComponent).toHaveTextContent('isSummary: false');
});

test('shows not found page if healthcategory is not found', async () => {
    mockUseParams.mockImplementation(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: 'foobar',
        resourceSlug: faker.lorem.slug(),
    }));

    setupWithAppProviders(<HealthData />);

    const heading = screen.getByRole('heading', {
        name: appMessage(`not_found.heading`),
        level: 1,
    });

    expect(heading).toBeVisible();
});

test('shows not found page if resource is not found', async () => {
    mockUseParams.mockImplementation(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
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
