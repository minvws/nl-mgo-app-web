import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { fhirMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { gpLaboratoryResult } from './gpLaboratoryResult.js';
import { i18n } from './summary.js';

test('01: mgo-resource', async () => {
    const output = gpLaboratoryResult.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = gpLaboratoryResult.parse(input01 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const mgoResource = gpLaboratoryResult.parse(input01 as Observation);
    const summary = gpLaboratoryResult.summary!(
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
    const output = gpLaboratoryResult.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', async () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    const summary = gpLaboratoryResult.summary!(
        mgoResource,
        testSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = gpLaboratoryResult.parse(input03 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const mgoResource = gpLaboratoryResult.parse(input03 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('03: summary', async () => {
    const mgoResource = gpLaboratoryResult.parse(input03 as Observation);
    const summary = gpLaboratoryResult.summary!(
        mgoResource,
        testSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(summary).toMatchFileSnapshot(
        './fixtures/03/summary.snap.json'
    );
});

test('uiSchema returns default label if context not supplied', () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    mgoResource.context = undefined;
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testSchemaContext());
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});

test('summary returns default label if context not supplied', () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    mgoResource.context = undefined;
    const summary = gpLaboratoryResult.summary!(
        mgoResource,
        testSchemaContext({
            isSummary: true,
        })
    );
    expect(summary.label).toBe(fhirMessage(i18n));
});
