import { expectJson } from '$test';
import { test } from 'vitest';
import { type DocumentManifest } from '../../fhir';
import input from './fixtures/fhir-resource.json';
import { iheMhdDocumentManifest } from './iheMhdDocumentManifest';

test('returns the expected output', () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = iheMhdDocumentManifest.parse(input as DocumentManifest);
    const uiSchema = iheMhdDocumentManifest.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
