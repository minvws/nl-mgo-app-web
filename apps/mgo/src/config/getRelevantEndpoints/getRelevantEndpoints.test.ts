import { beforeEach, expect, test, vi } from 'vitest';

import { faker } from '$test/faker';
import {
    HealthCategoryConfig,
    type DataServiceConfig,
    type DataServiceEndpointConfig,
} from '@minvws/mgo-config';
import { PartialDeep } from 'type-fest';

const hoisted = vi.hoisted(() => {
    return {
        getDataServicesConfig: vi.fn(() => ({}) as Record<string, DataServiceConfig>),
    };
});

vi.mock('@minvws/mgo-config', async (importOriginal) => {
    const mod = await importOriginal<typeof import('@minvws/mgo-config')>();
    return {
        ...mod,
        get dataServicesConfig() {
            return hoisted.getDataServicesConfig();
        },
    };
});

beforeEach(() => {
    vi.clearAllMocks();
});

function mockDataServiceConfig(endpoints: DataServiceEndpointConfig[] = []): DataServiceConfig {
    return {
        id: faker.string.uuid(),
        name: faker.lorem.word(),
        fhirVersion: faker.lorem.word(),
        fhirVersionEnum: faker.lorem.word(),
        endpoints,
    };
}
function mockEndpointConfig(profiles: string[] = []) {
    return {
        id: faker.string.uuid(),
        path: faker.lorem.word(),
        profiles,
    };
}

test('retrieves relevant endpoints for a given category', async () => {
    const profile = faker.lorem.word();
    const matchingEndpoint1 = mockEndpointConfig([profile]);
    const matchingEndpoint2 = mockEndpointConfig([profile]);
    const dataService1 = mockDataServiceConfig([matchingEndpoint1]);
    const dataService2 = mockDataServiceConfig([matchingEndpoint2, mockEndpointConfig()]);
    const dataService3 = mockDataServiceConfig([mockEndpointConfig()]);

    hoisted.getDataServicesConfig.mockReturnValue({
        [dataService1.id]: dataService1,
        [dataService2.id]: dataService2,
        [dataService3.id]: dataService3,
    });

    vi.resetModules();
    const { getRelevantEndpoints } = await import('./getRelevantEndpoints');

    const category = {
        id: faker.string.uuid(),
        subcategories: [
            {
                profiles: [profile],
            },
        ],
    } as HealthCategoryConfig;

    const result = getRelevantEndpoints([category]);

    expect(result.length).toBe(2);
    expect(result).toEqual([
        {
            dataServiceId: dataService1.id,
            endpointId: matchingEndpoint1.id,
        },
        {
            dataServiceId: dataService2.id,
            endpointId: matchingEndpoint2.id,
        },
    ]);
});

test('does not return the same endpoint multiple times even if it does match multiple categories', async () => {
    const profileA = faker.lorem.word();
    const profileB = faker.lorem.word();
    const matchingEndpoint1 = mockEndpointConfig([profileA]);
    const matchingEndpoint2 = mockEndpointConfig([profileA, profileB]);
    const dataService1 = mockDataServiceConfig([matchingEndpoint1]);
    const dataService2 = mockDataServiceConfig([matchingEndpoint2, mockEndpointConfig()]);

    hoisted.getDataServicesConfig.mockReturnValue({
        [dataService1.id]: dataService1,
        [dataService2.id]: dataService2,
    });

    vi.resetModules();
    const { getRelevantEndpoints } = await import('./getRelevantEndpoints');

    const categories: PartialDeep<HealthCategoryConfig, { recurseIntoArrays: true }>[] = [
        {
            id: faker.string.uuid(),
            subcategories: [
                {
                    profiles: [profileA],
                },
            ],
        },
        {
            id: faker.string.uuid(),
            subcategories: [
                {
                    profiles: [profileB],
                },
            ],
        },
    ];

    const result = getRelevantEndpoints(categories as HealthCategoryConfig[]);

    expect(result.length).toBe(2);
    expect(result).toEqual([
        {
            dataServiceId: dataService1.id,
            endpointId: matchingEndpoint1.id,
        },
        {
            dataServiceId: dataService2.id,
            endpointId: matchingEndpoint2.id,
        },
    ]);
});
