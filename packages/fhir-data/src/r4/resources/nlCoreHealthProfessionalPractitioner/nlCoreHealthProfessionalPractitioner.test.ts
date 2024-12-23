import { expectJson, testUiSchemaContext, faker } from '$test';
import { type Practitioner } from 'fhir/r4';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { r4NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';

test('returns the expected output', () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(
        input as Practitioner,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(
        input as Practitioner,
        faker.custom.i18nContext()
    );
    const uiSchema = r4NlCoreHealthProfessionalPractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
