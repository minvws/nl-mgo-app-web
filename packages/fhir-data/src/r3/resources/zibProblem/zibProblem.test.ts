import { expectJson, testUiSchemaContext } from '$test';
import { type Condition } from 'fhir/r3';
import { expect, test } from 'vitest';
import input from './fixtures/zib-Problem-01.json';
import { zibProblem } from './zibProblem';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('parseZibProblem returns the expected output 01', () => {
    const output = zibProblem.parse(input as Condition);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Problem-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibProblem.parse(input as Condition);
    const uiSchema = zibProblem.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-Problem-01-uiSchema.snap.json');
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
    expect(uiSchema.label).toBe(message(i18n));
});
