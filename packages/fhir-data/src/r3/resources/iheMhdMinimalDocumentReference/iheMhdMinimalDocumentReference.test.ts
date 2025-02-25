import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type DocumentReference } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { iheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

test('returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('summary returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    const uiSchema = iheMhdMinimalDocumentReference.summary(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
            isSummary: true,
        })
    );
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/summary.snap.json');
});

test('uiSchema returns the expected output when there is no content', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    output.content.attachment = undefined;
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema-no-content.snap.json'
    );
});

test('summary returns the expected output when there is no content', () => {
    const output = iheMhdMinimalDocumentReference.parse(input as DocumentReference);
    output.content.attachment = undefined;
    const uiSchema = iheMhdMinimalDocumentReference.summary(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
            isSummary: true,
        })
    );
    expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/summary-no-content.snap.json'
    );
});
