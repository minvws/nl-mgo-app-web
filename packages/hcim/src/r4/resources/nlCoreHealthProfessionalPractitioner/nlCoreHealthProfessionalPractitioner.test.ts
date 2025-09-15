import { expectJson, testSchemaContext } from '$test';
import { type Practitioner } from '@minvws/mgo-fhir/r4';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json' with { type: 'json' };
import { r4NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner.js';

test('returns the expected output', async () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    const uiSchema = r4NlCoreHealthProfessionalPractitioner.uiSchema(output, testSchemaContext());
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
