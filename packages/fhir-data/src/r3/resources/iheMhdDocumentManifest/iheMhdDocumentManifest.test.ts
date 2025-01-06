import { expectJson, testUiSchemaContext } from '$test';
import { type DocumentManifest } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { iheMhdDocumentManifest } from './iheMhdDocumentManifest';

test('returns the expected output', () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    const uiSchema = iheMhdDocumentManifest.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
