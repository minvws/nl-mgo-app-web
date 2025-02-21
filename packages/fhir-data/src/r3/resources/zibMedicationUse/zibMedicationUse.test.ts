import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import type { MedicationStatement } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import inputFhirData02 from './fixtures/02/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibMedicationUse } from './zibMedicationUse';

test('01: mgo-resource', () => {
    const output = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const schema = zibMedicationUse.uiSchema(mgoResource, testUiSchemaContext());
    expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('01: summary', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const schema = zibMedicationUse.summary(mgoResource, testUiSchemaContext({ isSummary: true }));
    expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot('./fixtures/01/summary.snap.json');
});

test('01: ui-schema - has a label even when there is no medicine reference', () => {
    const mgoResource = zibMedicationUse.parse({
        meta: {
            profile: [zibMedicationUse.profile],
        },
    } as MedicationStatement);

    const schema = zibMedicationUse.uiSchema(mgoResource, testUiSchemaContext({ useMock: true }));
    expect(schema.label).toBe(testMessage(i18n));
});

test('02: mgo-resource', () => {
    const output = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    const schema = zibMedicationUse.uiSchema(mgoResource, testUiSchemaContext());
    expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('02: summary', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    const schema = zibMedicationUse.summary(mgoResource, testUiSchemaContext({ isSummary: true }));
    expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot('./fixtures/02/summary.snap.json');
});
