import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type ProcedureRequest } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input2 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibProcedureRequest } from './zibProcedureRequest.js';

test('01: mgo-resource', async () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = zibProcedureRequest.parse(input2 as ProcedureRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    const uiSchema = zibProcedureRequest.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const output = zibProcedureRequest.parse(input2 as ProcedureRequest);
    const uiSchema = zibProcedureRequest.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
