import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Condition } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibProblem } from './zibProblem';

test('01: mgo-resource', async () => {
    const output = zibProblem.parse(input as Condition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibProblem.parse(input as Condition);
    const uiSchema = zibProblem.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
