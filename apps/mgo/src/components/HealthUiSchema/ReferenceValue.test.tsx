import { useResourceRoutePath } from '$/hooks';
import { type RoutePath } from '$/routing';
import { useResourcesStore, type ResourcesState } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { type ReferenceValue as ReferenceValueData } from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthUiSchemaContext } from './HealthUiSchemaContext';
import { ReferenceValue } from './ReferenceValue';

vi.mock('$/hooks', () => ({
    useResourceRoutePath: vi.fn(),
}));

vi.mock('$/store', async (importOriginal) => {
    const mod = await importOriginal<typeof import('$/store')>();
    const getResourceByReferenceId = vi.fn();
    return {
        ...mod,
        useResourcesStore: (callback: (state: ResourcesState) => void) =>
            callback({ getResourceByReferenceId } as unknown as ResourcesState),
    };
});

// eslint-disable-next-line react-hooks/rules-of-hooks
const mockGetResourceByReferenceId = useResourcesStore(
    (x) => x.getResourceByReferenceId
) as MockedFunction<ResourcesState['getResourceByReferenceId']>;

const mockUseResourceRoutePath = useResourceRoutePath as MockedFunction<
    typeof useResourceRoutePath
>;

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
    const referencedResource = faker.custom.resource({
        dataServiceMethod: resource.dataServiceMethod,
    });

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
    const referencedResource = faker.custom.resource({
        dataServiceMethod: resource.dataServiceMethod + faker.lorem.word(),
    });

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
