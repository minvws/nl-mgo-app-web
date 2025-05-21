import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type DocumentManifest } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { iheMhdDocumentManifest } from './iheMhdDocumentManifest';

test('01: mgo-resource', async () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    const uiSchema = iheMhdDocumentManifest.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
