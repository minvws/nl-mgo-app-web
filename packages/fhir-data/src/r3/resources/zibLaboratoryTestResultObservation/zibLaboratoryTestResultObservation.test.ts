import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { zibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';

test('01: mgo-resource', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(
        mgoResource,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(
        mgoResource,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        mgoResource,
        testUiSchemaContext({ isSummary: true })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('uiSchema returns default label if code not supplied', () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    mgoResource.code = undefined;
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(
        mgoResource,
        testUiSchemaContext()
    );
    expect(uiSchema.label).toBe(fhirMessage('r3.zib_laboratory_test_result_observation'));
});

test('summary returns default label if code not supplied', () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    mgoResource.code = undefined;
    const uiSchema = zibLaboratoryTestResultObservation.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage('r3.zib_laboratory_test_result_observation'));
});
