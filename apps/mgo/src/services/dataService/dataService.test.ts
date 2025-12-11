import { beforeEach, expect, test, vi } from 'vitest';

import { losslessParse } from '@minvws/mgo-utils';
import { createDataService } from './dataService';

const hoisted = vi.hoisted(() => {
    return {
        kyCreate: vi.fn(),
        appConfig: { dva_url: 'https://dva.test' },
        getDataServiceConfig: vi.fn(),
    };
});

vi.mock('ky', () => ({
    default: { create: hoisted.kyCreate },
}));

vi.mock('$/config', () => ({
    appConfig: hoisted.appConfig,
    getDataServiceConfig: hoisted.getDataServiceConfig,
}));

beforeEach(() => {
    hoisted.kyCreate.mockReset();
    hoisted.getDataServiceConfig.mockReset();
});

test('returns undefined when dataService config is missing', () => {
    hoisted.getDataServiceConfig.mockReturnValue(undefined);

    const result = createDataService({ dataServiceId: 'unknown', resourceEndpoint: 'endpoint' });

    expect(result).toBeUndefined();
    expect(hoisted.kyCreate).not.toHaveBeenCalled();
});

test('returns undefined when resourceEndpoint is missing', () => {
    hoisted.getDataServiceConfig.mockReturnValue({
        id: 'gp',
        fhirVersion: '4.0.1',
        fhirVersionEnum: 'R4',
    });

    const result = createDataService({ dataServiceId: 'gp' });

    expect(result).toBeUndefined();
    expect(hoisted.kyCreate).not.toHaveBeenCalled();
});

test('creates ky instance with correct options and sets meta', () => {
    const dataServiceConfig = { id: 'gp', fhirVersion: '4.0.1', fhirVersionEnum: 'R4' };
    hoisted.getDataServiceConfig.mockReturnValue(dataServiceConfig);

    const instance: Record<string, unknown> = {};
    hoisted.kyCreate.mockReturnValue(instance);

    const resourceEndpoint = 'https://org.example/fhir/endpoint';
    const result = createDataService({ dataServiceId: dataServiceConfig.id, resourceEndpoint });

    expect(hoisted.kyCreate).toHaveBeenCalledWith(
        expect.objectContaining({
            prefixUrl: `${hoisted.appConfig.dva_url}/fhir`,
            parseJson: losslessParse,
            headers: expect.objectContaining({
                Accept: `application/fhir+json; fhirVersion=${dataServiceConfig.fhirVersion}`,
                'x-mgo-dva-target': resourceEndpoint,
            }),
        })
    );

    expect(result).toBe(instance);
    expect(result?.meta).toEqual({
        dataServiceId: dataServiceConfig.id,
        fhirVersionEnum: dataServiceConfig.fhirVersionEnum,
    });
});
