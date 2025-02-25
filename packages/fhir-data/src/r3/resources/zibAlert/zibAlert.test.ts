import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Flag } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/zib-Alert-01.json';
import { i18n } from './uiSchema';
import { zibAlert } from './zibAlert';

test('praseZibAlert returns the expected output 01', () => {
    const output = zibAlert.parse(input as Flag);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Alert-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibAlert.parse(input as Flag);
    const uiSchema = zibAlert.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-Alert-01-uiSchema.snap.json');
});

test('uiSchema returns default label if code not supplied', () => {
    const output = zibAlert.parse(input as Flag);
    output.code = undefined;
    const uiSchema = zibAlert.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
