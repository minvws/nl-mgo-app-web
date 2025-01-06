import { expectJson, testUiSchemaContext } from '$test';
import { type Patient } from 'fhir/r4';
import { test } from 'vitest';
import input01 from './fixtures/fhir-resource.json';
import { r4NlCorePatient } from './nlCorePatient';

test('parseNlCorePatient returns the expected output 01', () => {
    const output = r4NlCorePatient.parse(input01 as Patient);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = r4NlCorePatient.parse(input01 as Patient);
    const zibUiSchema = r4NlCorePatient.uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
