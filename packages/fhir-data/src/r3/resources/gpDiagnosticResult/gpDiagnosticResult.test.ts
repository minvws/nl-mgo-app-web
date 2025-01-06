import { expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { beforeAll, test, vi } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { gpDiagnosticResult } from './gpDiagnosticResult';

beforeAll(() => {
    vi.clearAllMocks();
});

test('returns the expected output 01', () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = gpDiagnosticResult.parse(input02 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = gpDiagnosticResult.parse(input02 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
