import input01 from './fixtures/nl-core-Patient-01.json';

import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { type Patient } from 'fhir/r4';
import { nlCorePatientR4 } from './nlCorePatient';

test('parseNlCorePatient returns the expected output 01', () => {
    const output = nlCorePatientR4.parse(input01 as Patient);
    expectJson(output).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-output.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = nlCorePatientR4.parse(input01 as Patient);
    const zibUiSchema = nlCorePatientR4.uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-uiSchema.snap.json');
});
