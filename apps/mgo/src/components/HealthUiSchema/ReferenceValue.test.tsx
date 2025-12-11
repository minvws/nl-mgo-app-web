import { useResourceDetailsRoutePath } from '$/hooks';
import { type RoutePath } from '$/routing';
import { useStore } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type ReferenceValue as ReferenceValueData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';
import { ReferenceValue } from './ReferenceValue';

vi.mock('$/hooks', () => ({
    useResourceRoutePath: vi.fn(),
}));

vi.spyOn(useStore.use, 'getResourceByReferenceId').mockReturnValue(vi.fn());
const mockGetResourceByReferenceId = vi.mocked(useStore.use.getResourceByReferenceId());

const mockUseResourceRoutePath = useResourceDetailsRoutePath as MockedFunction<
    typeof useResourceDetailsRoutePath
>;

vi.mock('$/hooks', () => ({
    useResourceDetailsRoutePath: vi.fn(),
}));

afterEach(() => {
    vi.resetAllMocks();
});

test('renders with regular href if the referenced resource has the same dataServiceMethod', async () => {
    const value: ReferenceValueData = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.sentence(),
        display: faker.lorem.sentence(),
        reference: `${faker.lorem.sentence()}/${faker.number.int()}`,
    };

    const resource = faker.custom.resource();
    const referencedResource = faker.custom.resource();
    referencedResource.source.endpointId = resource.source.endpointId;

    const resourceRoutPath = faker.lorem.slug() as RoutePath;
    mockUseResourceRoutePath.mockReturnValue(resourceRoutPath);
    mockGetResourceByReferenceId.mockImplementationOnce(() => referencedResource);

    setupWithAppProviders(
        <HealthUiSchemaContext.Provider value={{ resource }}>
            <ReferenceValue value={value} />
        </HealthUiSchemaContext.Provider>
    );

    const link = screen.getByRole('link', { name: value.label });
    expect(link.getAttribute('href')).toBe(`/${resourceRoutPath}`);
});

test('does not render as a link without a resource', async () => {
    const value: ReferenceValueData = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.sentence(),
        display: faker.lorem.sentence(),
        reference: `${faker.lorem.sentence()}/${faker.number.int()}`,
    };

    mockUseResourceRoutePath.mockReturnValue(faker.lorem.slug() as RoutePath);
    mockGetResourceByReferenceId.mockImplementationOnce(() => undefined);

    setupWithAppProviders(<ReferenceValue value={value} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('definition', { name: value.label })).toBeInTheDocument();
});

test('does not render as a link if the dataServiceMethod does not match', async () => {
    const value: ReferenceValueData = {
        type: 'REFERENCE_VALUE',
        label: faker.lorem.sentence(),
        display: faker.lorem.sentence(),
        reference: `${faker.lorem.sentence()}/${faker.number.int()}`,
    };
    const resource = faker.custom.resource();
    const referencedResource = faker.custom.resource();
    referencedResource.source.endpointId = resource.source.endpointId + faker.lorem.word();

    const resourceRoutPath = faker.lorem.slug() as RoutePath;
    mockUseResourceRoutePath.mockReturnValue(resourceRoutPath);
    mockGetResourceByReferenceId.mockImplementationOnce(() => referencedResource);

    setupWithAppProviders(
        <HealthUiSchemaContext.Provider value={{ resource }}>
            <ReferenceValue value={value} />
        </HealthUiSchemaContext.Provider>
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('definition', { name: value.label })).toBeInTheDocument();
});
