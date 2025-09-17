import { beforeEach, expect, test, vi } from 'vitest';

import { faker } from '$test/faker';
import { type DataServiceConfig, type DataServiceEndpointConfig } from '@minvws/mgo-config';

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

test('creates relevant queries for each data service of an organization based on the profiles', async () => {
    const profile = faker.lorem.word();
    const dataService1 = mockDataServiceConfig([mockEndpointConfig([profile])]);
    const dataService2 = mockDataServiceConfig([mockEndpointConfig([profile])]);
    const dataService3 = mockDataServiceConfig([mockEndpointConfig([profile])]);
    const dataService4 = mockDataServiceConfig([mockEndpointConfig([`${profile}2`])]);

    hoisted.getDataServicesConfig.mockReturnValue({
        [dataService1.id]: dataService1,
        [dataService2.id]: dataService2,
        [dataService3.id]: dataService3,
        [dataService4.id]: dataService4,
    });

    vi.resetModules();
    const { createHealthQueries } = await import('./createHealthQueries');
    const profiles = [profile];
    const organizations = [
        faker.custom.healthcareOrganization({
            dataServices: [
                {
                    id: dataService1.id,
                    resourceEndpoint: faker.internet.url(),
                },
                {
                    id: dataService3.id,
                    resourceEndpoint: faker.internet.url(),
                },
                {
                    id: dataService4.id,
                    resourceEndpoint: faker.internet.url(),
                },
            ],
        }),
    ];

    const result = await createHealthQueries({
        profiles,
        organizations,
    });

    expect(result.length).toBe(2);
    expect(result.map((r) => r.meta)).toEqual([
        {
            organizationId: organizations[0].id,
            resourceEndpoint: organizations[0].dataServices[0].resourceEndpoint,
            dataServiceId: dataService1.id,
            endpointId: dataService1.endpoints[0].id,
        },
        {
            organizationId: organizations[0].id,
            resourceEndpoint: organizations[0].dataServices[1].resourceEndpoint,
            dataServiceId: dataService3.id,
            endpointId: dataService3.endpoints[0].id,
        },
    ]);
});

test('creates relevant queries for each data service of each organization based on the profiles', async () => {
    const profile = faker.lorem.word();
    const dataService1 = mockDataServiceConfig([mockEndpointConfig([profile])]);
    const dataService2 = mockDataServiceConfig([mockEndpointConfig([profile])]);
    const dataService3 = mockDataServiceConfig([mockEndpointConfig([profile])]);
    const dataService4 = mockDataServiceConfig([mockEndpointConfig([`${profile}2`])]);

    hoisted.getDataServicesConfig.mockReturnValue({
        [dataService1.id]: dataService1,
        [dataService2.id]: dataService2,
        [dataService3.id]: dataService3,
        [dataService4.id]: dataService4,
    });

    vi.resetModules();
    const { createHealthQueries } = await import('./createHealthQueries');
    const profiles = [profile];
    const organizations = [
        faker.custom.healthcareOrganization({
            dataServices: [
                {
                    id: dataService1.id,
                    resourceEndpoint: faker.internet.url(),
                },
                {
                    id: dataService3.id,
                    resourceEndpoint: faker.internet.url(),
                },
                {
                    id: dataService4.id,
                    resourceEndpoint: faker.internet.url(),
                },
            ],
        }),
        faker.custom.healthcareOrganization({
            dataServices: [
                {
                    id: dataService1.id,
                    resourceEndpoint: faker.internet.url(),
                },
                {
                    id: dataService2.id,
                    resourceEndpoint: faker.internet.url(),
                },
            ],
        }),
    ];

    const result = await createHealthQueries({
        profiles,
        organizations,
    });

    expect(result.length).toBe(4);
    expect(result.map((r) => r.meta)).toEqual([
        {
            organizationId: organizations[0].id,
            resourceEndpoint: organizations[0].dataServices[0].resourceEndpoint,
            dataServiceId: dataService1.id,
            endpointId: dataService1.endpoints[0].id,
        },
        {
            organizationId: organizations[0].id,
            resourceEndpoint: organizations[0].dataServices[1].resourceEndpoint,
            dataServiceId: dataService3.id,
            endpointId: dataService3.endpoints[0].id,
        },
        {
            organizationId: organizations[1].id,
            resourceEndpoint: organizations[1].dataServices[0].resourceEndpoint,
            dataServiceId: dataService1.id,
            endpointId: dataService1.endpoints[0].id,
        },
        {
            organizationId: organizations[1].id,
            resourceEndpoint: organizations[1].dataServices[1].resourceEndpoint,
            dataServiceId: dataService2.id,
            endpointId: dataService2.endpoints[0].id,
        },
    ]);
});
