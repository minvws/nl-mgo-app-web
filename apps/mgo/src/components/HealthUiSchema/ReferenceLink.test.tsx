import { HealthCategory, healthCategorySlugs } from '$/healthCategory';
import { useParams } from '$/routing';
import { store, type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type ReferenceLink as ReferenceLinkData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { ReferenceLink } from './ReferenceLink';

vi.spyOn(store.use, 'getResourceByReferenceId').mockReturnValue(vi.fn());
const mockGetResourceByReferenceId = vi.mocked(store.use.getResourceByReferenceId());

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
