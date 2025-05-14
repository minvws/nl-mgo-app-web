import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Medication } from 'fhir/r3';
import { test } from 'vitest';
import inputMedication01 from './fixtures/fhir-resource.json';
import { zibProduct } from './zibProduct';

test('01: mgo-resource', async () => {
    const output = zibProduct.parse(inputMedication01 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = zibProduct.parse(inputMedication01 as Medication);
    const uiSchema = zibProduct.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
