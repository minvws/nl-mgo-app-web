import { useResourceDetailsRoutePath } from '$/hooks';
import { RoutePath } from '$/routing';
import { useStore, type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type ReferenceLink as ReferenceLinkData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { ReferenceLink } from './ReferenceLink';

vi.spyOn(useStore.use, 'getResourceByReferenceId').mockReturnValue(vi.fn());
const mockGetResourceByReferenceId = vi.mocked(useStore.use.getResourceByReferenceId());

vi.mock('$/hooks', () => ({
    useResourceDetailsRoutePath: vi.fn(),
}));

afterEach(() => {
    vi.resetAllMocks();
});

test('renders with regular href', async () => {
    const value: ReferenceLinkData = {
        type: 'REFERENCE_LINK',
        label: faker.lorem.sentence(),
        reference: `${faker.lorem.sentence()}/${faker.number.int()}`,
    };

    const resource = { slug: faker.lorem.slug() } as Resource;
    mockGetResourceByReferenceId.mockImplementationOnce(() => resource);
    const resourceDetailsPath = `/overzicht/${faker.lorem.slug()}/${resource.slug}/detail`;
    vi.mocked(useResourceDetailsRoutePath).mockImplementationOnce(
        () => resourceDetailsPath as RoutePath
    );

    setupWithAppProviders(<ReferenceLink value={value} />);
    const link = screen.getByRole('link', { name: value.label });
    expect(link.getAttribute('href')).toBe(resourceDetailsPath);
});
