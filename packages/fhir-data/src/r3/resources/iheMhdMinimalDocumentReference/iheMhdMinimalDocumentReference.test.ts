import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type DocumentReference } from 'fhir/r3';
import input from './fixtures/fhir-resource.json';
import { iheMhdMinimalDocumentReference } from './iheMhdMinimalDocumentReference';

test('returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(
        input as DocumentReference,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = iheMhdMinimalDocumentReference.parse(
        input as DocumentReference,
        faker.custom.i18nContext()
    );
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns the expected when there is not content output', () => {
    const output = iheMhdMinimalDocumentReference.parse(
        input as DocumentReference,
        faker.custom.i18nContext()
    );
    output.content.attachment = undefined;
    const uiSchema = iheMhdMinimalDocumentReference.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema-no-content.snap.json');
});
