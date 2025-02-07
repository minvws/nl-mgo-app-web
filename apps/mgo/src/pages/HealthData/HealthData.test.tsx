import { type HealthUiSchemaProps } from '$/components/HealthUiSchema/HealthUiSchema';
import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { Navigate, useParams } from '$/routing';
import { useResourcesStore, type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { message } from '$test/helpers/i18n';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthData } from './HealthData';

vi.mock('$/routing/useParams');
vi.mock('$/routing/Navigate');
vi.mock('../../components/HealthUiSchema/HealthUiSchema', () => {
    return {
        HealthUiSchema: ({ showDetails }: HealthUiSchemaProps) => (
            <div data-testid="ui-schema">showDetails: {`${!!showDetails}`}</div>
        ),
    };
});

const mockUseParams = useParams as MockedFunction<typeof useParams>;
const mockNavigate = Navigate as MockedFunction<typeof Navigate>;

beforeEach(() => {
    mockUseParams.mockReset();
    mockNavigate.mockReset();
});

test('shows the summary by default', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => ({}) as Resource);

    setupWithAppProviders(<HealthData />);

    await waitFor(() => expect(document.title).toContain(message('hc_medication.heading_summary')));
    const uiSchemaComponent = screen.getByTestId('ui-schema');
    expect(uiSchemaComponent).toHaveTextContent('showDetails: false');
});

test('can show all the details', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => ({}) as Resource);

    setupWithAppProviders(<HealthData showDetails />);

    await waitFor(() => expect(document.title).toContain(message('hc_medication.heading_detail')));
    const uiSchemaComponent = screen.getByTestId('ui-schema');
    expect(uiSchemaComponent).toHaveTextContent('showDetails: true');
});

test('redirects to the organization / health category page if there is no resource found', async () => {
    const params = {
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    };
    mockUseParams.mockImplementationOnce(() => params);

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => undefined);

    setupWithAppProviders(<HealthData />);

    expect(mockNavigate.mock.calls[0][0]).toEqual({
        to: `/organisaties/${params.organizationSlug}/${params.healthCategorySlug}`,
    });
});

test('redirects to the overview / health category page if there is no resource found', async () => {
    const params = {
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    };
    mockUseParams.mockImplementationOnce(() => params);

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => undefined);

    setupWithAppProviders(<HealthData />);

    expect(mockNavigate.mock.calls[0][0]).toEqual({
        to: `/overzicht/${params.healthCategorySlug}`,
    });
});
