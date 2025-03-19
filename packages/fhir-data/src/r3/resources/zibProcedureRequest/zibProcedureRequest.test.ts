import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type ProcedureRequest } from 'fhir/r3';
import { expect, test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import input2 from './fixtures/02/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibProcedureRequest } from './zibProcedureRequest';

test('returns the expected output 01', async () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', async () => {
    const output = zibProcedureRequest.parse(input2 as ProcedureRequest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', async () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    const uiSchema = zibProcedureRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema 02 returns the expected output', async () => {
    const output = zibProcedureRequest.parse(input2 as ProcedureRequest);
    const uiSchema = zibProcedureRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns default label if code not supplied', () => {
    const output = zibProcedureRequest.parse(input1 as ProcedureRequest);
    output.code = undefined;
    const uiSchema = zibProcedureRequest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
