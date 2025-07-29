import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Condition } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibProblem } from './zibProblem.js';

test('01: mgo-resource', async () => {
    const output = zibProblem.parse(input as Condition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibProblem.parse(input as Condition);
    const uiSchema = zibProblem.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
