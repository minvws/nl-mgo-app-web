import { expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibDrugUse } from './zibDrugUse';

test('returns the expected output 01', async () => {
    const output = zibDrugUse.parse(input as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = zibDrugUse.parse(input as Observation);
    const uiSchema = zibDrugUse.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
