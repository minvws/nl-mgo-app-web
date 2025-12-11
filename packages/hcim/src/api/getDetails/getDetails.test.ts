import { faker } from '$test';
import { type FhirVersion } from '@minvws/mgo-fhir';
import {
    type HealthUiSchema,
    type HealthUiSchemaFunction,
    type SingleValue,
} from '@minvws/mgo-hcim-ui';
import { Locale } from '@minvws/mgo-intl';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type ResourceConfig } from '../../resourceTypes.js';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig.js';
import { type MgoResource } from '../resources/resources.js';
import { createSchemaContext, SchemaOptions } from '../schemaContext/schemaContext.js';
import { getDetails } from './getDetails.js';

const mockGetResourceConfig = getResourceConfig as MockedFunction<typeof getResourceConfig>;

vi.mock('../getResourceConfig/getResourceConfig', () => ({
    getResourceConfig: vi.fn(),
}));

test('throws if the input is a MGO resource', () => {
    expect(() => getDetails({} as MgoResource<FhirVersion.R3>)).toThrowError(
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
        getDetails(mgoResource as MgoResource<FhirVersion.R3>);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});

test('returns the result of the ui schema and passed any extra resources', () => {
    const summaryUiSchema: HealthUiSchema = { label: 'Summary', children: [] };
    const uiSchema: HealthUiSchemaFunction<any, any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any

    mockGetResourceConfig.mockImplementation(
        () =>
            ({
                uiSchema,
            }) as ResourceConfig<any, any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const resources = [{ profile: faker.lorem.word() }];

    const result = getDetails(
        mgoResource as MgoResource<FhirVersion.R3>,
        { resources } as SchemaOptions<FhirVersion.R3>
    );

    expect(result).toEqual(summaryUiSchema);
    expect(uiSchema).toHaveBeenCalledWith(mgoResource, expect.objectContaining({ resources }));
});

test('empty entries in the resulting ui schema are set with defaults', () => {
    const summaryUiSchema: HealthUiSchema = {
        label: 'Summary',
        children: [
            {
                label: faker.lorem.sentence(),
                children: [
                    { type: 'SINGLE_VALUE', label: faker.lorem.sentence(), value: undefined },
                ],
            },
        ],
    };
    const uiSchema: HealthUiSchemaFunction<any, any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any
    mockGetResourceConfig.mockImplementation(() => ({ uiSchema }) as ResourceConfig<any, any, any>); // eslint-disable-line @typescript-eslint/no-explicit-any

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const { formatMessage } = createSchemaContext({
        ignoreMissingTranslations: true,
        locale: Locale.NL_NL,
    });

    const result = getDetails(mgoResource as MgoResource<FhirVersion.R3>);
    const singleValueDisplay = (result?.children[0].children[0] as SingleValue).value?.display;

    expect(singleValueDisplay).toBe(formatMessage('fhir.empty_value'));
});
