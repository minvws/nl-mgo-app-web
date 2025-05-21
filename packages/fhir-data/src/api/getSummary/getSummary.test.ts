import { faker } from '$test';
import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { Locale } from '@minvws/mgo-mgo-intl';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type ResourceConfig } from '../../types';
import { createSchemaContext, type HealthUiSchemaFunction } from '../../ui';
import { type HealthUiSchema, type SingleValue } from '../../ui/types';
import { type HealthUiSchemaOptions } from '../getDetails/getDetails';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type MgoResource } from '../resources/resources';
import { getSummary } from './getSummary';

const mockGetResourceConfig = getResourceConfig as MockedFunction<typeof getResourceConfig>;

vi.mock('../getResourceConfig/getResourceConfig', () => ({
    getResourceConfig: vi.fn(),
}));

test('throws if the input is a MGO resource', () => {
    expect(() => getSummary({} as MgoResource<FhirVersion.R3>)).toThrowError(
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
        getSummary(mgoResource as MgoResource<FhirVersion.R3>);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});

test('returns mock schema if there is no summary', () => {
    mockGetResourceConfig.mockImplementation(
        () =>
            ({
                summary: undefined,
            }) as ResourceConfig<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        id: faker.lorem.slug(),
        referenceId: faker.lorem.slug(),
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const result = getSummary(mgoResource as MgoResource<FhirVersion.R3>);
    expect(result).toEqual({
        label: mgoResource.id,
        children: [
            {
                label: 'Opties',
                children: [
                    {
                        type: 'REFERENCE_LINK',
                        label: 'Bekijk alle gegevens',
                        reference: mgoResource.referenceId,
                    },
                ],
            },
        ],
    });
});

test('returns mock schema with profile label if there is no summary and no id', () => {
    mockGetResourceConfig.mockImplementation(
        () =>
            ({
                summary: undefined,
            }) as ResourceConfig<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        referenceId: faker.lorem.slug(),
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const result = getSummary(mgoResource as MgoResource<FhirVersion.R3>);
    expect(result.label).toEqual(mgoResource.profile);
});

test('returns the result of the summary ui schema and passed any extra resources', () => {
    const summaryUiSchema: HealthUiSchema = { label: 'Summary', children: [] };
    const summaryFunc: HealthUiSchemaFunction<any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any

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

    const result = getSummary(
        mgoResource as MgoResource<FhirVersion.R3>,
        { resources } as HealthUiSchemaOptions<any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    expect(result).toEqual(summaryUiSchema);
    expect(summaryFunc).toHaveBeenCalledWith(mgoResource, expect.objectContaining({ resources }));
});

test('empty entries in the resulting summary ui schema are set with defaults', () => {
    const summaryUiSchema: HealthUiSchema = {
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
    const summary: HealthUiSchemaFunction<any> = vi.fn(() => summaryUiSchema); // eslint-disable-line @typescript-eslint/no-explicit-any
    mockGetResourceConfig.mockImplementation(() => ({ summary }) as ResourceConfig<any, any>); // eslint-disable-line @typescript-eslint/no-explicit-any

    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const { formatMessage } = createSchemaContext({
        ignoreMissingTranslations: true,
        locale: Locale.NL_NL,
    });

    const result = getSummary(mgoResource as MgoResource<FhirVersion.R3>);
    const singleValueDisplay = (result?.children[0].children[0] as SingleValue).display;

    expect(singleValueDisplay).toBe(formatMessage('fhir.empty_value'));
});
