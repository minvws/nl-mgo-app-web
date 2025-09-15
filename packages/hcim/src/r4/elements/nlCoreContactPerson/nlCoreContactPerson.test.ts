import { expectJson } from '$test';
import { type PatientContact } from '@minvws/mgo-fhir/r4';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import { parseNlCoreContactPerson } from './nlCoreContactPerson.js';

test('01: mgo-resource', async () => {
    const output = parseNlCoreContactPerson(inputFhirData01 as PatientContact);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});
