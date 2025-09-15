import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Specimen } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibLaboratoryTestResultSpecimen } from './zibLaboratoryTestResultSpecimen.js';

test('01: mgo-resource', async () => {
    const output = zibLaboratoryTestResultSpecimen.parse(input01 as Specimen);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultSpecimen.parse(input01 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimen.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibLaboratoryTestResultSpecimen.parse(input02 as Specimen);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultSpecimen.parse(input02 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimen.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
