import input1 from './fixtures/01/fhir-resource.json';
import input2 from './fixtures/02/fhir-resource.json';

import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { zibProcedureRequest } from './zibProcedureRequest';
import { type ProcedureRequest } from 'fhir/r3';

test('returns the expected output 01', () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibProcedureRequest.parse(input2 as ProcedureRequest);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    const uiSchema = zibProcedureRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema 02 returns the expected output', () => {
    const output = zibProcedureRequest.parse(input2 as ProcedureRequest);
    const uiSchema = zibProcedureRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
