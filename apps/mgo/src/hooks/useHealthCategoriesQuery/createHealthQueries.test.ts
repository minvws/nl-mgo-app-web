import { beforeEach, expect, test, vi } from 'vitest';

import { faker } from '$test/faker';
import {
    HealthCategoryConfig,
    type DataServiceConfig,
    type DataServiceEndpointConfig,
} from '@minvws/mgo-config';
import { DataService } from '@minvws/mgo-org-search';
import { getRelevantEndpoints } from '../../config';
import { createHealthQueries } from './createHealthQueries';

const hoisted = vi.hoisted(() => {
    return {
        getRelevantEndpoints: vi.fn<typeof getRelevantEndpoints>(() => []),
    };
});

vi.mock('../../config', async (importOriginal) => {
    const mod = await importOriginal<typeof import('../../config')>();
    return {
        ...mod,
        getRelevantEndpoints: hoisted.getRelevantEndpoints,
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
function mockEndpointConfig() {
    return {
        id: faker.string.uuid(),
        path: faker.lorem.word(),
        profiles: [],
    };
}

test('creates relevant queries for each data service of an organization based on the profiles', async () => {
    const dataService1 = mockDataServiceConfig([mockEndpointConfig()]);
    const dataService2 = mockDataServiceConfig([mockEndpointConfig()]);
    const dataService3 = mockDataServiceConfig([mockEndpointConfig()]);

    const organizations = [
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
                {
                    id: dataService3.id,
                    resourceEndpoint: faker.internet.url(),
                },
            ] as DataService[],
        }),
    ];

    const relevantEndpoints = [
        {
            dataServiceId: dataService1.id,
            endpointId: dataService1.endpoints[0].id,
        },
        {
            dataServiceId: dataService3.id,
            endpointId: dataService3.endpoints[0].id,
        },
    ];

    hoisted.getRelevantEndpoints.mockReturnValue(relevantEndpoints);

    const categories = [] as HealthCategoryConfig[];

    const result = await createHealthQueries({
        categories,
        organizations,
    });

    expect(hoisted.getRelevantEndpoints).toHaveBeenCalledWith(categories);

    expect(result.length).toBe(2);
    expect(result.map((r) => r.meta)).toEqual([
        {
            organizationId: organizations[0].id,
            dataServiceId: dataService1.id,
            endpointId: dataService1.endpoints[0].id,
        },
        {
            organizationId: organizations[0].id,
            dataServiceId: dataService3.id,
            endpointId: dataService3.endpoints[0].id,
        },
    ]);
});
