import { faker } from '$test';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type ResourceConfig } from '../../types/Fhir';
import { type UiSchemaFunction } from '../../ui';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type UiSchemaOptions } from '../getUiSchema/getUiSchema';
import { type MgoResourceR3 } from '../resources/resources';
import { type UiSchema } from '../types';
import { getSummaryUiSchema } from './getSummaryUiSchema';

const mockGetResourceConfig = getResourceConfig as MockedFunction<typeof getResourceConfig>;

vi.mock('../getResourceConfig/getResourceConfig', () => ({
    getResourceConfig: vi.fn(),
}));

test('throws if the input is a MGO resource', () => {
    expect(() => getSummaryUiSchema({} as MgoResourceR3)).toThrowError(
        `input does not seem to be a valid MGO Resource. Received MGO resource profile: "undefined"`
    );
});

test('throws if no config could be found', () => {
    mockGetResourceConfig.mockImplementation(() => undefined);
    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    expect(() => {
        getSummaryUiSchema(mgoResource as MgoResourceR3);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});

test('returns undefined if there is no summary', () => {
    mockGetResourceConfig.mockImplementation(
        () =>
            ({
                summary: undefined,
            }) as ResourceConfig<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const result = getSummaryUiSchema(mgoResource as MgoResourceR3);
    expect(result).toBe(undefined);
});

test('returns the result of the summary ui schema and passed any extra resources', () => {
    const summaryUiSchema: UiSchema = { label: 'Summary', children: [] };
    const summaryFunc: UiSchemaFunction<any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any

    mockGetResourceConfig.mockImplementation(
        () =>
            ({
                summary: summaryFunc,
            }) as ResourceConfig<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const resources = [{ profile: faker.lorem.word() }];

    const result = getSummaryUiSchema(
        mgoResource as MgoResourceR3,
        { resources } as UiSchemaOptions<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    expect(result).toBe(summaryUiSchema);
    expect(summaryFunc).toHaveBeenCalledWith(mgoResource, expect.objectContaining({ resources }));
});
