import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Flag } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibAlert } from './zibAlert.js';

test('01: mgo-resource', async () => {
    const output = zibAlert.parse(inputFhirData01 as Flag);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibAlert.parse(inputFhirData01 as Flag);
    const uiSchema = zibAlert.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
