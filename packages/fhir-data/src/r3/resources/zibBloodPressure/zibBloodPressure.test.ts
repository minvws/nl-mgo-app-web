import { expectJson, faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import { parse } from '../../../parse';
import input from './fixtures/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibBloodPressure } from './zibBloodPressure';

test('returns the expected output 01', async () => {
    const output = zibBloodPressure.parse(input as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = zibBloodPressure.parse(input as Observation);
    const uiSchema = zibBloodPressure.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test.each([
    {
        name: 'averageBloodPressureLOINC',
        code: '8478-0',
    },
    {
        name: 'averageBloodPressureSNOMED',
        code: '6797001',
    },
])('Default NoResult is shown when data is considered empty: %j', ({ name, code }) => {
    const data = {
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    code: code,
                    display: 'AverageBloodPressure recorded with UCUM',
                },
            ],
        },
        valueQuantity: {
            value: faker.number.int(999),
            unit: 'mmHg',
            system: 'http://unitsofmeasure.org',
            code: 'mm[Hg]',
        },
    };
    input.component.push(data);

    const output = zibBloodPressure.parse(input as Observation);
    expect(output).toEqual(
        expect.objectContaining({
            [name]: {
                valueQuantity: parse.quantity(data.valueQuantity),
            },
        })
    );
});

test.each([
    {
        name: 'positionSNOMED',
        code: '424724000',
    },
    {
        name: 'cuffTypeSNOMED',
        code: '70665002',
    },
    {
        name: 'diastolicEndpoint',
        code: '85549003',
    },
])('Default NoResult is shown when data is considered empty: %j', ({ name, code }) => {
    const data = {
        code: {
            coding: [
                {
                    system: 'http://loinc.org',
                    code: code,
                    display: 'AverageBloodPressure recorded with UCUM',
                },
            ],
        },
        valueCodeableConcept: {
            coding: [
                {
                    system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.4.15.1',
                    code: 'L',
                    display: 'Groot',
                },
            ],
        },
    };
    input.component.push(data);

    const output = zibBloodPressure.parse(input as Observation);
    expect(output).toEqual(
        expect.objectContaining({
            [name]: {
                valueCodeableConcept: parse.codeableConcept(data.valueCodeableConcept),
            },
        })
    );
});

test('uiSchema returns default label if effectiveDateTime not supplied', () => {
    const output = zibBloodPressure.parse(input as Observation);
    output.effectiveDateTime = undefined;
    const uiSchema = zibBloodPressure.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
