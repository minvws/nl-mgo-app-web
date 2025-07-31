import { expectJson, testSchemaContext } from '$test';
import { type Patient } from '@minvws/mgo-fhir/r4';
import { test } from 'vitest';
import input01 from './fixtures/fhir-resource.json' with { type: 'json' };
import { r4NlCorePatient } from './nlCorePatient.js';

test('parseNlCorePatient returns the expected output 01', async () => {
    const output = r4NlCorePatient.parse(input01 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const zibData = r4NlCorePatient.parse(input01 as Patient);
    const zibUiSchema = r4NlCorePatient.uiSchema(zibData, testSchemaContext());
    await expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
