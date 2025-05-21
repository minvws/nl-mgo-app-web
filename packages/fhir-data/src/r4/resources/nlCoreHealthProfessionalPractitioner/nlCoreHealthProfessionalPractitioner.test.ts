import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Practitioner } from 'fhir/r4';
import { expect, test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { r4NlCoreHealthProfessionalPractitioner } from './nlCoreHealthProfessionalPractitioner';
import { i18n } from './uiSchema';

test('returns the expected output', async () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = r4NlCoreHealthProfessionalPractitioner.parse(input as Practitioner);
    const uiSchema = r4NlCoreHealthProfessionalPractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
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
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
