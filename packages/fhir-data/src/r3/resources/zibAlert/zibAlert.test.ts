import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Flag } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/fhir-resource.json';
import { zibAlert } from './zibAlert';

test('01: mgo-resource', async () => {
    const output = zibAlert.parse(inputFhirData01 as Flag);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibAlert.parse(inputFhirData01 as Flag);
    const uiSchema = zibAlert.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
