import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import { gpLaboratoryResult } from '././gpLaboratoryResult';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { i18n } from './uiSchema';

test('returns the expected output 01', () => {
    const output = gpLaboratoryResult.parse(input01 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpLaboratoryResult.parse(input01 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(output, testUiSchemaContext());
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('summary returns the expected output 01', () => {
    const output = gpLaboratoryResult.parse(input01 as Observation);
    const summary = gpLaboratoryResult.summary(
        output,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot('./fixtures/01/summary.snap.json');
});

test('returns the expected output 02', () => {
    const output = gpLaboratoryResult.parse(input02 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = gpLaboratoryResult.parse(input02 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(output, testUiSchemaContext());
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('summary returns the expected output 02', () => {
    const output = gpLaboratoryResult.parse(input02 as Observation);
    const summary = gpLaboratoryResult.summary(
        output,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot('./fixtures/02/summary.snap.json');
});

test('returns the expected output 03', () => {
    const output = gpLaboratoryResult.parse(input03 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = gpLaboratoryResult.parse(input03 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(output, testUiSchemaContext());
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});

test('summary returns the expected output 03', () => {
    const output = gpLaboratoryResult.parse(input03 as Observation);
    const summary = gpLaboratoryResult.summary(
        output,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot('./fixtures/03/summary.snap.json');
});

test('uiSchema returns default label if context not supplied', () => {
    const output = gpLaboratoryResult.parse(input02 as Observation);
    output.context = undefined;
    const uiSchema = gpLaboratoryResult.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
