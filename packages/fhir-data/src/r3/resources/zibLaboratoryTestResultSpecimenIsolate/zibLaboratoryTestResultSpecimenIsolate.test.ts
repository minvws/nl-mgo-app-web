import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { type Specimen } from 'fhir/r3';
import { zibLaboratoryTestResultSpecimenIsolate } from './zibLaboratoryTestResultSpecimenIsolate';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';

test('returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSpecimenIsolate.parse(input01 as Specimen);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSpecimenIsolate.parse(input01 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimenIsolate.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibLaboratoryTestResultSpecimenIsolate.parse(input02 as Specimen);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibLaboratoryTestResultSpecimenIsolate.parse(input02 as Specimen);
    const uiSchema = zibLaboratoryTestResultSpecimenIsolate.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
