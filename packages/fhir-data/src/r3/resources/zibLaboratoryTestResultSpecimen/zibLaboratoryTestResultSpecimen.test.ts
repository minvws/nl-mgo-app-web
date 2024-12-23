import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Specimen } from 'fhir/r3';
import { zibLaboratoryTestResultSpecimen } from './zibLaboratoryTestResultSpecimen';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';

test('returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSpecimen.parse(
        input01 as Specimen,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSpecimen.parse(
        input01 as Specimen,
        faker.custom.i18nContext()
    );
    const uiSchema = zibLaboratoryTestResultSpecimen.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibLaboratoryTestResultSpecimen.parse(
        input02 as Specimen,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibLaboratoryTestResultSpecimen.parse(
        input02 as Specimen,
        faker.custom.i18nContext()
    );
    const uiSchema = zibLaboratoryTestResultSpecimen.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
