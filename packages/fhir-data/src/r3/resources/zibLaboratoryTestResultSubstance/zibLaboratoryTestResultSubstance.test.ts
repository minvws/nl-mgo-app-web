import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Substance } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance';

test('01: mgo-resource', async () => {
    const output = zibLaboratoryTestResultSubstance.parse(input as Substance);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultSubstance.parse(input as Substance);
    const uiSchema = zibLaboratoryTestResultSubstance.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
