import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Location } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input from './fixtures/01/fhir-resource.json' with { type: 'json' };
import { nlCoreLocation } from './nlCoreLocation.js';

test('01: mgo-resource', async () => {
    const output = nlCoreLocation.parse(input as Location);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreLocation.parse(input as Location);
    const uiSchema = nlCoreLocation.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});
