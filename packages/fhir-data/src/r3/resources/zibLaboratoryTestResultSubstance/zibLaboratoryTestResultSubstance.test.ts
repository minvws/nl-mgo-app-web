import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Substance } from 'fhir/r3';
import { zibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance';
import input from './fixtures/fhir-resource.json';

test('returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSubstance.parse(
        input as Substance,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSubstance.parse(
        input as Substance,
        faker.custom.i18nContext()
    );
    const uiSchema = zibLaboratoryTestResultSubstance.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
