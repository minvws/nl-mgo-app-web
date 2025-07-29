import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Coverage } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/fhir-resource.json' with { type: 'json' };
import { zibPayer } from './zibPayer.js';

test('01: mgo-resource', async () => {
    const output = zibPayer.parse(input01 as Coverage);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibPayer.parse(input01 as Coverage);
    const zibPayerUiSchema = zibPayer.uiSchema(
        mgoResource,
        testSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectHealthCareUiSchemaJson(zibPayerUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
