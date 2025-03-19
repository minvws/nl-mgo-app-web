import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Condition } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/zib-Problem-01.json';
import { i18n } from './uiSchema';
import { zibProblem } from './zibProblem';

test('parseZibProblem returns the expected output 01', async () => {
    const output = zibProblem.parse(input as Condition);
    await expectJson(output).toMatchFileSnapshot('./fixtures/zib-Problem-01-output.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = zibProblem.parse(input as Condition);
    const uiSchema = zibProblem.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-Problem-01-uiSchema.snap.json');
});

test('uiSchema returns default label if code not supplied', () => {
    const output = zibProblem.parse(input as Condition);
    output.code = undefined;
    const uiSchema = zibProblem.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
