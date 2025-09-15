import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Substance } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance.js';

test('01: mgo-resource', async () => {
    const output = zibLaboratoryTestResultSubstance.parse(input as Substance);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultSubstance.parse(input as Substance);
    const uiSchema = zibLaboratoryTestResultSubstance.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
