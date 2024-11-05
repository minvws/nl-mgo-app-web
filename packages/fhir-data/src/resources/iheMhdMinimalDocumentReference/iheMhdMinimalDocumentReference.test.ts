import { expectJson } from '$test';
import { test } from 'vitest';
import { type DocumentReference } from '../../fhir';
import input from './fixtures/fhir-resource.json';
import { iheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

test('returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns the expected when there is not content output', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    output.content.attachment = undefined;
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema-no-content.snap.json');
});
