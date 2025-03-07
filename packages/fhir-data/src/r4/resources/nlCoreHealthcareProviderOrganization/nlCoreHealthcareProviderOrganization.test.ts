import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Organization } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { nlCoreHealthcareProviderOrganization } from './nlCoreHealthcareProviderOrganization';
import { i18n } from './uiSchema';

test('returns the expected output 01', async () => {
    const output = nlCoreHealthcareProviderOrganization.parse(input01 as Organization);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = nlCoreHealthcareProviderOrganization.parse(input01 as Organization);
    const uiSchema = nlCoreHealthcareProviderOrganization.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealthcareProviderOrganization.parse(input01 as Organization);
    output.name = undefined;
    const uiSchema = nlCoreHealthcareProviderOrganization.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toEqual(fhirMessage(i18n));
});
