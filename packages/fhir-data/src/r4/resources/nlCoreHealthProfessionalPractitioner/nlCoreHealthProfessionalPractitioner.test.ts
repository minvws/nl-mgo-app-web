import { expectJson, testUiSchemaContext } from '$test';
import { type Practitioner } from 'fhir/r4';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { nlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';

test('returns the expected output', () => {
    const output = nlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = nlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    const uiSchema = nlCoreHealthProfessionalPractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
