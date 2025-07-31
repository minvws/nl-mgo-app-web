import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type DocumentReference } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { iheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference.js';

test('01: mgo-resource', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input01 as DocumentReference);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input02 as DocumentReference);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input01 as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input02 as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input01 as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.summary(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('02: summary', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input02 as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.summary(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('01: ui-chema returns the expected output when there is no content', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input01 as DocumentReference);
    output.content.attachment = undefined;
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema-no-content.snap.json'
    );
});

test('01: summary returns the expected output when there is no content', async () => {
    const output = iheMhdMinimalDocumentReference.parse(input01 as DocumentReference);
    output.content.attachment = undefined;
    const uiSchema = iheMhdMinimalDocumentReference.summary(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/summary-no-content.snap.json'
    );
});
