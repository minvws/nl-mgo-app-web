import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Coverage } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/fhir-resource.json';
import { zibPayer } from './zibPayer';

test('01: mgo-resource', async () => {
    const output = zibPayer.parse(input01 as Coverage);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibPayer.parse(input01 as Coverage);
    const zibPayerUiSchema = zibPayer.uiSchema(
        mgoResource,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectHealthCareUiSchemaJson(zibPayerUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
