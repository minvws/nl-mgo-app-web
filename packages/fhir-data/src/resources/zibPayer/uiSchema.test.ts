import { expectJson } from '$test';
import { test } from 'vitest';
import { type Coverage } from '../../fhir';
import inputFhirData from './fixtures/zib-Payer-01.json';
import { uiSchema } from './uiSchema';
import { zibPayer } from './zibPayer';

const zibPayerData = zibPayer.parse(inputFhirData as Coverage);

test('uiSchema returns the expected output', () => {
    const zibPayerUiSchema = uiSchema(zibPayerData);
    expectJson(zibPayerUiSchema).toMatchFileSnapshot('./fixtures/zib-Payer-01-uiSchema.snap.json');
});
