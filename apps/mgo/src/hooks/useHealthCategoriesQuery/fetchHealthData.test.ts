import { beforeEach, expect, test, vi } from 'vitest';

import { DataServiceEndpointConfig } from '$/config';
import { type DataService } from '$/services';
import { faker } from '$test/faker';
import { Bundle } from '@minvws/mgo-fhir';
import { fetchHealthData } from './fetchHealthData';

const hoisted = vi.hoisted(() => {
    const getDataServiceEndpointConfig = vi.fn(
        () =>
            ({
                path: faker.lorem.word(),
            }) as DataServiceEndpointConfig | undefined
    );
    const dataServiceJson = vi.fn(() => ({}));
    const dataServiceGet = vi.fn(() => ({ json: dataServiceJson }));
    const dataService = {
        meta: { dataServiceId: 'x', fhirVersionEnum: 'R3' },
        get: dataServiceGet,
    } as unknown as DataService;
    const createDataService = vi.fn(() => dataService as DataService | undefined);

    return {
        createDataService,
        dataService,
        dataServiceGet,
        dataServiceJson,
        getDataServiceEndpointConfig,
        getMgoResource: vi.fn(() => faker.custom.mgoResource),
        isFhirResource: vi.fn(() => true),
    };
});

vi.mock('$/services', async (importOriginal) => {
    const mod = await importOriginal<typeof import('$/services')>();
    return {
        ...mod,
        createDataService: hoisted.createDataService,
    };
});

vi.mock('$/config', async (importOriginal) => {
    const mod = await importOriginal<typeof import('$/config')>();
    return {
        ...mod,
        getDataServiceEndpointConfig: hoisted.getDataServiceEndpointConfig,
    };
});

vi.mock('@minvws/mgo-fhir', async (importOriginal) => {
    const mod = await importOriginal<typeof import('@minvws/mgo-fhir')>();
    return {
        ...mod,
        isFhirResource: hoisted.isFhirResource,
    };
});

vi.mock('@minvws/mgo-hcim', async (importOriginal) => {
    const mod = await importOriginal<typeof import('@minvws/mgo-hcim')>();
    return {
        ...mod,
        getMgoResource: hoisted.getMgoResource,
    };
});

beforeEach(() => {
    vi.clearAllMocks();
});

test('returns mgo resources from the response bundle', async () => {
    hoisted.dataServiceJson.mockResolvedValue({
        resourceType: 'Bundle',
        entry: [
            {
                resource: {},
            },
            {
                resource: {},
            },
        ],
    } as Bundle);

    const result = await fetchHealthData({
        dataServiceId: `${faker.number.int()}`,
        endpointId: faker.lorem.word(),
        resourceEndpoint: faker.internet.url(),
    });

    expect(result.length).toBe(2);
});

test('replaces {{today}} in the endpoint path with the current date', async () => {
    hoisted.getDataServiceEndpointConfig.mockReturnValue({
        path: '{{today}}',
    } as DataServiceEndpointConfig);

    await fetchHealthData({
        dataServiceId: `${faker.number.int()}`,
        endpointId: faker.lorem.word(),
        resourceEndpoint: faker.internet.url(),
    });

    expect(hoisted.dataServiceGet).toHaveBeenCalledWith(
        expect.stringContaining(new Date().toISOString().split('T')[0])
    );
});

test('throws if the response data does not contain a bundle', async () => {
    hoisted.isFhirResource.mockReturnValue(false);
    const args = {
        dataServiceId: `${faker.number.int()}`,
        endpointId: faker.lorem.word(),
        resourceEndpoint: faker.internet.url(),
    };
    expect(async () => {
        await fetchHealthData(args);
    }).rejects.toThrowError(
        `Response for data service ${args.dataServiceId}:${args.endpointId} - does not seem to contain a Fhir Bundle.`
    );
});

test('throws if there is no data service', async () => {
    hoisted.createDataService.mockReturnValue(undefined);
    expect(async () => {
        await fetchHealthData({
            dataServiceId: `${faker.number.int()}`,
            endpointId: faker.lorem.word(),
            resourceEndpoint: faker.internet.url(),
        });
    }).rejects.toThrowError('No data service or endpoint was found!');
});

test('throws if there is no endpoint config', async () => {
    hoisted.getDataServiceEndpointConfig.mockReturnValue(undefined);
    expect(async () => {
        await fetchHealthData({
            dataServiceId: `${faker.number.int()}`,
            endpointId: faker.lorem.word(),
            resourceEndpoint: faker.internet.url(),
        });
    }).rejects.toThrowError('No data service or endpoint was found!');
});
