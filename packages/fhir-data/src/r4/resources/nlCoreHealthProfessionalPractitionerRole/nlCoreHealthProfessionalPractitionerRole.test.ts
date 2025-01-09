import { expectJson, expectUiSchemaJson, testUiSchemaContext } from '$test';
import { message } from '$test/i18n';
import { type PractitionerRole } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/fhir-resource.json';
import { nlCoreHealthProfessionalPractitionerRole } from './nlCoreHealthProfessionalPractitionerRole';

test('returns the expected output 01', () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    const uiSchema = nlCoreHealthProfessionalPractitionerRole.uiSchema(
        output,
        testUiSchemaContext()
    );
    expectUiSchemaJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    output.speciality = undefined;
    const uiSchema = nlCoreHealthProfessionalPractitionerRole.uiSchema(
        output,
        testUiSchemaContext()
    );
    expect(uiSchema.label).toEqual(message('r4.nl_core_health_professional_practitioner_role'));
});
