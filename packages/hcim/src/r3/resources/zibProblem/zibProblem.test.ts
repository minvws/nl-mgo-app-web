import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Condition } from '@minvws/mgo-fhir/r3';
import { fhirMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import inputFhirData03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { zibProblem } from './zibProblem.js';

test('01: mgo-resource', async () => {
    const output = zibProblem.parse(inputFhirData01 as Condition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibProblem.parse(inputFhirData01 as Condition);
    const uiSchema = zibProblem.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const mgoResource = zibProblem.parse(inputFhirData01 as Condition);
    const schema = zibProblem.summary(mgoResource, testSchemaContext({ isSummary: true }));
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('01: summary label defaults to standard resource label when there is no code', async () => {
    const mgoResource = zibProblem.parse(inputFhirData01 as Condition);
    mgoResource.code = undefined;
    const schema = zibProblem.summary(mgoResource, testSchemaContext({ isSummary: true }));
    expect(schema.label).toEqual(fhirMessage('r3.zib_problem'));
});

test('02: multiple bodysites - mgo-resource', async () => {
    const output = zibProblem.parse(inputFhirData02 as Condition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: multiple bodysites - detail ', async () => {
    const mgoResource = zibProblem.parse(inputFhirData02 as Condition);
    const schema = zibProblem.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: multiple bodysites - summary ', async () => {
    const mgoResource = zibProblem.parse(inputFhirData02 as Condition);
    const schema = zibProblem.summary(mgoResource, testSchemaContext({ isSummary: true }));
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('03: no bodysites - mgo-resource', async () => {
    const output = zibProblem.parse(inputFhirData03 as Condition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: no bodysites - detail ', async () => {
    const mgoResource = zibProblem.parse(inputFhirData03 as Condition);
    const schema = zibProblem.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('03: no bodysites - summary', async () => {
    const mgoResource = zibProblem.parse(inputFhirData03 as Condition);
    const schema = zibProblem.summary(mgoResource, testSchemaContext({ isSummary: true }));
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/03/summary.snap.json'
    );
});
