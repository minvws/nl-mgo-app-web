import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { fhirMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation.js';

test('01: mgo-resource', async () => {
    const output = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        mgoResource,
        testSchemaContext({
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
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', async () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input02 as Observation);
    const summary = zibLaboratoryTestResultObservation.summary(
        mgoResource,
        testSchemaContext({ isSummary: true })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('uiSchema returns default label if code not supplied', () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    mgoResource.code = undefined;
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(mgoResource, testSchemaContext());
    expect(uiSchema.label).toBe(fhirMessage('r3.zib_laboratory_test_result_observation'));
});

test('summary returns default label if code not supplied', () => {
    const mgoResource = zibLaboratoryTestResultObservation.parse(input01 as Observation);
    mgoResource.code = undefined;
    const uiSchema = zibLaboratoryTestResultObservation.summary(
        mgoResource,
        testSchemaContext({
            isSummary: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage('r3.zib_laboratory_test_result_observation'));
});
