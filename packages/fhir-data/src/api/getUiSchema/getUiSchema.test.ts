import { faker } from '$test';
import { type MockedFunction, expect, test, vi } from 'vitest';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type MgoResourceR3 } from '../resources/resources';
import { type UiSchemaOptions, getUiSchema } from './getUiSchema';
import { type SingleValue, type UiSchema } from '../types';
import { createUiSchemaContext, type UiSchemaFunction } from '../../ui';
import { type ResourceConfig } from '../../types/Fhir';

const mockGetResourceConfig = getResourceConfig as MockedFunction<typeof getResourceConfig>;

vi.mock('../getResourceConfig/getResourceConfig', () => ({
    getResourceConfig: vi.fn(),
}));

test('throws if the input is a MGO resource', () => {
    expect(() => getUiSchema({} as MgoResourceR3)).toThrowError(
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
        getUiSchema(mgoResource as MgoResourceR3);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});

test('returns the result of the ui schema and passed any extra resources', () => {
    const summaryUiSchema: UiSchema = { label: 'Summary', children: [] };
    const uiSchema: UiSchemaFunction<any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any

    mockGetResourceConfig.mockImplementation(
        () =>
            ({
                uiSchema,
            }) as ResourceConfig<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const resources = [{ profile: faker.lorem.word() }];

    const result = getUiSchema(
        mgoResource as MgoResourceR3,
        { resources } as UiSchemaOptions<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    expect(result).toEqual(summaryUiSchema);
    expect(uiSchema).toHaveBeenCalledWith(mgoResource, expect.objectContaining({ resources }));
});

test('empty entries in the resulting ui schema are set with defaults', () => {
    const summaryUiSchema: UiSchema = {
        label: 'Summary',
        children: [
            {
                label: faker.lorem.sentence(),
                children: [
                    { type: 'SINGLE_VALUE', label: faker.lorem.sentence(), display: undefined },
                ],
            },
        ],
    };
    const uiSchema: UiSchemaFunction<any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any
    mockGetResourceConfig.mockImplementation(() => ({ uiSchema }) as ResourceConfig<any, any>); // eslint-disable-line @typescript-eslint/no-explicit-any

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const { formatMessage } = createUiSchemaContext({ ignoreMissingTranslations: true });

    const result = getUiSchema(mgoResource as MgoResourceR3);
    const singleValueDisplay = (result?.children[0].children[0] as SingleValue).display;

    expect(singleValueDisplay).toBe(formatMessage('schema.empty_entry_display'));
});
