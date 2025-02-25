import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Consent } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { i18n } from './uiSchema';
import { zibAdvanceDirective } from './zibAdvanceDirective';

test('returns the expected output 01', () => {
    const output = zibAdvanceDirective.parse(input01 as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibAdvanceDirective.parse(input02 as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', () => {
    const output = zibAdvanceDirective.parse(input03 as Consent);
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibAdvanceDirective.parse(input01 as Consent);
    const uiSchema = zibAdvanceDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibAdvanceDirective.parse(input02 as Consent);
    const uiSchema = zibAdvanceDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = zibAdvanceDirective.parse(input03 as Consent);
    const uiSchema = zibAdvanceDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});

test('uiSchema returns default label if dateTime not supplied', () => {
    const output = zibAdvanceDirective.parse(input01 as Consent);
    output.dateTime = undefined;
    const uiSchema = zibAdvanceDirective.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
