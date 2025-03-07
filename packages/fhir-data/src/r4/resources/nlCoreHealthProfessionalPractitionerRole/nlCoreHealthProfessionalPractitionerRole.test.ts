import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type PractitionerRole } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/fhir-resource.json';
import { nlCoreHealthProfessionalPractitionerRole } from './nlCoreHealthProfessionalPractitionerRole';
import { i18n } from './uiSchema';

test('returns the expected output 01', async () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    const uiSchema = nlCoreHealthProfessionalPractitionerRole.uiSchema(
        output,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    output.speciality = undefined;
    const uiSchema = nlCoreHealthProfessionalPractitionerRole.uiSchema(
        output,
        testUiSchemaContext()
    );
    expect(uiSchema.label).toEqual(fhirMessage(i18n));
});
