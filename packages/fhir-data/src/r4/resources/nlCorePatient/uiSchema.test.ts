import { expectJson } from '$test';
import { test } from 'vitest';
import { type Patient } from 'fhir/r4';
import inputFhirData from './fixtures/nl-core-Patient-01.json';
import { nlCorePatientR4 } from './nlCorePatient';
import { uiSchema } from './uiSchema';

test('uiSchema returns the expected output', () => {
    const zibData = nlCorePatientR4.parse(inputFhirData as Patient);
    const zibUiSchema = uiSchema(zibData);
    expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-uiSchema.snap.json');
});
