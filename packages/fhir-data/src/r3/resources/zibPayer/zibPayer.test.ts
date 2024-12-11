import input01 from './fixtures/zib-Payer-01.json';

import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { type Coverage } from 'fhir/r3';
import { zibPayer } from './zibPayer';

test('parseZibPayer returns the expected output 01', () => {
    const output = zibPayer.parse(input01 as Coverage);
    expectJson(output).toMatchFileSnapshot('./fixtures/zib-Payer-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibPayer.parse(input01 as Coverage);
    const zibPayerUiSchema = zibPayer.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibPayerUiSchema).toMatchFileSnapshot('./fixtures/zib-Payer-01-uiSchema.snap.json');
});
