import { expectJson, testUiSchemaContext } from '$test';
import { type Practitioner } from 'fhir/r4';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { r4NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';

test('returns the expected output', async () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    const uiSchema = r4NlCoreHealthProfessionalPractitioner.uiSchema(output, testUiSchemaContext());
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
