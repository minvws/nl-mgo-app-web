import { expectJson, expectUiSchemaJson, faker, testUiSchemaContext } from '$test';
import type { MedicationStatement } from 'fhir/r3';
import { expect, test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import inputFhirData02 from './fixtures/02/fhir-resource.json';
import { zibMedicationUse } from './zibMedicationUse';

test('01: mgo-resource', () => {
    const output = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', () => {
    const zibMedicationUseData = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const zibMedicationUseUiSchema = zibMedicationUse.uiSchema(
        zibMedicationUseData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', () => {
    const zibMedicationUseData = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const zibMedicationUseUiSchema = zibMedicationUse.summary(
        zibMedicationUseData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('01: ui-schema - has a label even when there is no medicine reference', () => {
    const zibMedicationUseData = zibMedicationUse.parse({
        ...faker.fhir.medicationStatement({
            meta: {
                profile: [zibMedicationUse.profile],
            },
        }),
    });

    zibMedicationUseData.medicationReference = undefined;

    const zibMedicationUseUiSchema = zibMedicationUse.uiSchema(
        zibMedicationUseData,
        testUiSchemaContext({
            useMock: true,
        })
    );

    expect(zibMedicationUseUiSchema.label).toBe('intl(r3.zib_medication_use)');
});

test('02: mgo-resource', () => {
    const output = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', () => {
    const zibMedicationUseData = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    const zibMedicationUseUiSchema = zibMedicationUse.uiSchema(
        zibMedicationUseData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', () => {
    const zibMedicationUseData = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    const zibMedicationUseUiSchema = zibMedicationUse.summary(
        zibMedicationUseData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectUiSchemaJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});
