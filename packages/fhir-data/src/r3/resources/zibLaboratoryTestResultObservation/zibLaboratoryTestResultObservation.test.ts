import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { zibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';

test('returns the expected output 01', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('summary returns the expected output 01', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        output,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('returns the expected output 02', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('summary returns the expected output 02', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        output,
        testUiSchemaContext({ isSummary: true })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('uiSchema returns default label if code not supplied', () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    output.code = undefined;
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toBe(fhirMessage('r3.zib_laboratory_test_result_observation'));
});
