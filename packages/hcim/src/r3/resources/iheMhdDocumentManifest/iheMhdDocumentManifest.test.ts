import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type DocumentManifest } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json' with { type: 'json' };
import { iheMhdDocumentManifest } from './iheMhdDocumentManifest.js';

test('01: mgo-resource', async () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    const uiSchema = iheMhdDocumentManifest.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
