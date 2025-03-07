import { expectJson, testUiSchemaContext } from '$test';
import { type Specimen } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { zibLaboratoryTestResultSpecimen } from './zibLaboratoryTestResultSpecimen';

test('returns the expected output 01', async () => {
    const output = zibLaboratoryTestResultSpecimen.parse(input01 as Specimen);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = zibLaboratoryTestResultSpecimen.parse(input01 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimen.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('returns the expected output 02', async () => {
    const output = zibLaboratoryTestResultSpecimen.parse(input02 as Specimen);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', async () => {
    const output = zibLaboratoryTestResultSpecimen.parse(input02 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimen.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
