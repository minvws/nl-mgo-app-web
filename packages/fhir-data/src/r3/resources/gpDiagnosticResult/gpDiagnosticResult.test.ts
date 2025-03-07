import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { beforeAll, expect, test, vi } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { gpDiagnosticResult } from './gpDiagnosticResult';
import { i18n } from './uiSchema';

beforeAll(() => {
    vi.clearAllMocks();
});

test('returns the expected output 01', async () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', async () => {
    const output = gpDiagnosticResult.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', async () => {
    const output = gpDiagnosticResult.parse(input02 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns default label if context not supplied', () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    output.context = undefined;
    const uiSchema = gpDiagnosticResult.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
