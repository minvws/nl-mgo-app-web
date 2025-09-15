import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Observation } from '@minvws/mgo-fhir/r3';
import { beforeAll, test, vi } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { gpDiagnosticResult } from './gpDiagnosticResult.js';

beforeAll(() => {
    vi.clearAllMocks();
});

test('01: mgo-resource', async () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = gpDiagnosticResult.parse(input02 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('03: mgo-resource', async () => {
    const output = gpDiagnosticResult.parse(input03 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = gpDiagnosticResult.parse(input01 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const output = gpDiagnosticResult.parse(input02 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: ui-schema', async () => {
    const output = gpDiagnosticResult.parse(input03 as Observation);
    const uiSchema = gpDiagnosticResult.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});
