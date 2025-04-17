import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { useParams } from '$/routing';
import { useResourcesStore, type Resource, type ResourcesState } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type ReferenceLink as ReferenceLinkData } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { ReferenceLink } from './ReferenceLink';

// eslint-disable-next-line react-hooks/rules-of-hooks
const mockGetResourceByReferenceId = useResourcesStore(
    (x) => x.getResourceByReferenceId
) as MockedFunction<ResourcesState['getResourceByReferenceId']>;

vi.mock('$/store', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importOriginal<typeof import('$/store')>();
    const getResourceByReferenceId = vi.fn();
    return {
        ...mod,
        useResourcesStore: (callback: (state: ResourcesState) => void) =>
            callback({ getResourceByReferenceId } as unknown as ResourcesState),
    };
});

afterEach(() => {
    vi.resetAllMocks();
});

vi.mock('$/routing/useParams');
const mockUseParams = useParams as MockedFunction<typeof useParams>;

test('renders with regular href', async () => {
    const value: ReferenceLinkData = {
        type: 'REFERENCE_LINK',
        label: faker.lorem.sentence(),
        reference: `${faker.lorem.sentence()}/${faker.number.int()}`,
    };

    const healthCategorySlug = healthCategorySlugs[HealthCategory.Medication];
    mockUseParams.mockImplementationOnce(() => ({
        healthCategorySlug,
        resourceSlug: faker.lorem.slug(),
    }));
    const resource = { slug: faker.lorem.slug() } as Resource;
    mockGetResourceByReferenceId.mockImplementationOnce(() => resource);

    setupWithAppProviders(<ReferenceLink value={value} />);
    const link = screen.getByRole('link', { name: value.label });
    expect(link.getAttribute('href')).toBe(
        `/overzicht/${healthCategorySlug}/${resource.slug}/detail`
    );
});
