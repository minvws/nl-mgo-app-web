import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type MedicationStatement } from '@minvws/mgo-fhir/r3';
import { fhirMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibMedicationUse } from './zibMedicationUse.js';

test('01: mgo-resource', async () => {
    const output = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const schema = zibMedicationUse.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('summary uses fallback when there is no medication reference', async () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    mgoResource.medicationReference = undefined;
    const schema = zibMedicationUse.summary(mgoResource, testSchemaContext({ isSummary: true }));
    expect(schema.label).toEqual(fhirMessage('r3.zib_medication_use'));
});

test('01: summary', async () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const schema = zibMedicationUse.summary(mgoResource, testSchemaContext({ isSummary: true }));
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('01: card', async () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    const card = zibMedicationUse.card(mgoResource, testSchemaContext({ isSummary: true }));
    await expectJson(card).toMatchFileSnapshot('./fixtures/01/card.snap.json');
});

test('01: card falls back to resource.id for title when medicationReference display is not set', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    mgoResource.medicationReference = { ...mgoResource.medicationReference!, display: undefined };
    const card = zibMedicationUse.card(mgoResource, testSchemaContext({ isSummary: true }));
    expect(card.title).toEqual(mgoResource.id);
});

test('01: card falls back to i18n label for title when medicationReference and id are not set', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    mgoResource.medicationReference = undefined;
    mgoResource.id = undefined;
    const card = zibMedicationUse.card(mgoResource, testSchemaContext({ isSummary: true }));
    expect(card.title).toEqual(fhirMessage('r3.zib_medication_use'));
});

test('01: card uses null for detail when effectivePeriod start is not set', () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData01 as MedicationStatement);
    mgoResource.effectivePeriod = { ...mgoResource.effectivePeriod, start: undefined };
    const card = zibMedicationUse.card(mgoResource, testSchemaContext({ isSummary: true }));
    expect(card.detail).toEqual(undefined);
});

test('02: mgo-resource', async () => {
    const output = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    const schema = zibMedicationUse.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', async () => {
    const mgoResource = zibMedicationUse.parse(inputFhirData02 as MedicationStatement);
    const schema = zibMedicationUse.summary(mgoResource, testSchemaContext({ isSummary: true }));
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});
