import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import { gpLaboratoryResult } from '././gpLaboratoryResult';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { i18n } from './summary';

test('01: mgo-resource', async () => {
    const output = gpLaboratoryResult.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = gpLaboratoryResult.parse(input01 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const mgoResource = gpLaboratoryResult.parse(input01 as Observation);
    const summary = gpLaboratoryResult.summary(
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
    const output = gpLaboratoryResult.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', async () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    const summary = gpLaboratoryResult.summary(
        mgoResource,
        testUiSchemaContext({
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
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('03: summary', async () => {
    const mgoResource = gpLaboratoryResult.parse(input03 as Observation);
    const summary = gpLaboratoryResult.summary(
        mgoResource,
        testUiSchemaContext({
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
    const uiSchema = gpLaboratoryResult.uiSchema(mgoResource, testUiSchemaContext());
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});

test('summary returns default label if context not supplied', () => {
    const mgoResource = gpLaboratoryResult.parse(input02 as Observation);
    mgoResource.context = undefined;
    const summary = gpLaboratoryResult.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expect(summary.label).toBe(fhirMessage(i18n));
});
