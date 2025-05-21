import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Specimen } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { zibLaboratoryTestResultSpecimenIsolate } from './zibLaboratoryTestResultSpecimenIsolate';

test('01: mgo-resource', async () => {
    const output = zibLaboratoryTestResultSpecimenIsolate.parse(input01 as Specimen);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultSpecimenIsolate.parse(input01 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimenIsolate.uiSchema(
        mgoResource,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibLaboratoryTestResultSpecimenIsolate.parse(input02 as Specimen);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultSpecimenIsolate.parse(input02 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimenIsolate.uiSchema(
        mgoResource,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
