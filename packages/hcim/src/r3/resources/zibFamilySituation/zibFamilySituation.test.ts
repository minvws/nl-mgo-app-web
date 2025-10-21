import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibFamilySituation } from './zibFamilySituation.js';

test('01: mgo-resource', async () => {
    const output = zibFamilySituation.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = zibFamilySituation.parse(input01 as Observation);
    const uiSchema = zibFamilySituation.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibFamilySituation.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = zibFamilySituation.parse(input02 as Observation);
    const uiSchema = zibFamilySituation.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
