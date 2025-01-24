import { expectJson, testUiSchemaContext } from '$test';
import { type Practitioner } from 'fhir/r4';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { r4NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';
import { message } from '$test/i18n';
import { i18n } from './uiSchema';

test('returns the expected output', () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    const uiSchema = r4NlCoreHealthProfessionalPractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns default label if name not supplied', () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    output.name = undefined;
    const uiSchema = r4NlCoreHealthProfessionalPractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(message(i18n));
});
