import { expectJson, testUiSchemaContext } from '$test';
import { type Substance } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibLaboratoryTestResultSubstance } from './zibLaboratoryTestResultSubstance';

test('returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSubstance.parse(input as Substance);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibLaboratoryTestResultSubstance.parse(input as Substance);
    const uiSchema = zibLaboratoryTestResultSubstance.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
