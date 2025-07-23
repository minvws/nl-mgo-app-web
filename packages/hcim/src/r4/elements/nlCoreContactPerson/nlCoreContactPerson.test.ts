import { expectJson } from '$test';
import { type PatientContact } from 'fhir/r4';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import { parseNlCoreContactPerson } from './nlCoreContactPerson';

test('01: mgo-resource', async () => {
    const output = parseNlCoreContactPerson(inputFhirData01 as PatientContact);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});
