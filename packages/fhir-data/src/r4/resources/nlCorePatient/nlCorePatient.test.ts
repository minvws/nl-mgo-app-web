import input01 from './fixtures/fhir-resource.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Patient } from 'fhir/r4';
import { r4NlCorePatient } from './nlCorePatient';

test('parseNlCorePatient returns the expected output 01', () => {
    const output = r4NlCorePatient.parse(input01 as Patient, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = r4NlCorePatient.parse(input01 as Patient, faker.custom.i18nContext());
    const zibUiSchema = r4NlCorePatient.uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
