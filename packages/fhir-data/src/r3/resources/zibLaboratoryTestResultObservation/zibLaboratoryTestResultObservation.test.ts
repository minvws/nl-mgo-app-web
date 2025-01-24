import { expectJson, expectUiSchemaJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { zibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';

import { message } from '$test/i18n';

test('returns the expected output 01', () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expectUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('summary returns the expected output 01', () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        output,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expectUiSchemaJson(summary).toMatchFileSnapshot('./fixtures/01/summary.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expectUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('summary returns the expected output 02', () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        output,
        testUiSchemaContext({ isSummary: true })
    );
    expectUiSchemaJson(summary).toMatchFileSnapshot('./fixtures/02/summary.snap.json');
});

test('uiSchema returns default label if code not supplied', () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    output.code = undefined;
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toBe(message('r3.zib_laboratory_test_result_observation'));
});
