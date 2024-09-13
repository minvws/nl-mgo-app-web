import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { useParams, Navigate } from '$/routing';
import { useResourcesStore, type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { messageRegexp } from '$test/helpers/i18n';
import { screen } from '@testing-library/react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { UiSchemaDetail } from './UiSchemaDetail';

vi.mock('$/routing/useParams');
vi.mock('$/routing/Navigate');

const mockUseParams = useParams as MockedFunction<typeof useParams>;
const mockNavigate = Navigate as MockedFunction<typeof Navigate>;

test('shows ui schema', async () => {
    mockUseParams.mockImplementationOnce(() => ({
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    }));

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(
        () =>
            ({
                uiSchema: {
                    label: faker.lorem.sentence(),
                    children: [
                        {
                            label: 'zib_medication_use.group_general_information',
                            children: [],
                        },
                    ],
                },
            }) as Pick<Resource, 'uiSchema'> as any // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    setupWithAppProviders(<UiSchemaDetail />);

    screen.getByRole('heading', {
        name: messageRegexp('detail_medication.heading'),
        level: 1,
    });
    screen.getByRole('heading', {
        name: messageRegexp('zib_medication_use.group_general_information'),
        level: 2,
    });
});

test('redirects to the healtCategory page if there is no resource found', async () => {
    const params = {
        organizationSlug: faker.lorem.slug(),
        healthCategorySlug: healthCategorySlugs[HealthCategory.Medication],
        resourceSlug: faker.lorem.slug(),
    };
    mockUseParams.mockImplementationOnce(() => params);

    const store = useResourcesStore.getState();
    const mock = vi.spyOn(store, 'getResourceBySlug');
    mock.mockImplementationOnce(() => undefined);

    setupWithAppProviders(<UiSchemaDetail />);

    expect(mockNavigate.mock.calls[0][0]).toEqual({
        to: `/overzicht/${params.organizationSlug}/${params.healthCategorySlug}`,
    });
});
