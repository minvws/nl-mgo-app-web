import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Location } from 'fhir/r4';
import { expect, test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import { nlCoreHealthcareProvider } from './nlCoreHealthcareProvider';
import { i18n } from './uiSchema';

test('returns the expected output 01', async () => {
    const output = nlCoreHealthcareProvider.parse(input1 as Location);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', async () => {
    const output = nlCoreHealthcareProvider.parse(input1 as Location);
    const uiSchema = nlCoreHealthcareProvider.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealthcareProvider.parse(input1 as Location);
    output.managingOrganization = undefined;
    const uiSchema = nlCoreHealthcareProvider.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toEqual(fhirMessage(i18n));
});
