import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type PractitionerRole } from 'fhir/r4';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { nlCoreHealthProfessionalPractitionerRole } from './nlCoreHealthProfessionalPractitionerRole';

test('01: mgo-resource', async () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input01 as PractitionerRole);
    const uiSchema = nlCoreHealthProfessionalPractitionerRole.uiSchema(
        output,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input02 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCoreHealthProfessionalPractitionerRole.parse(input02 as PractitionerRole);
    const uiSchema = nlCoreHealthProfessionalPractitionerRole.uiSchema(
        output,
        testUiSchemaContext()
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
