import { expectJson, faker, testUiSchemaContext } from '$test';
import { type Organization } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import { nlCoreHealthcareProviderOrganization } from './nlCoreHealthcareProviderOrganization';
import { message } from '$test/i18n';

test('returns the expected output 01', () => {
    const output = nlCoreHealthcareProviderOrganization.parse(
        input01 as Organization,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = nlCoreHealthcareProviderOrganization.parse(
        input01 as Organization,
        faker.custom.i18nContext()
    );
    const uiSchema = nlCoreHealthcareProviderOrganization.uiSchema(output, testUiSchemaContext());
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealthcareProviderOrganization.parse(
        input01 as Organization,
        faker.custom.i18nContext()
    );
    output.name = undefined;
    const uiSchema = nlCoreHealthcareProviderOrganization.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toEqual(message('r4.nl_core_healthcare_provider_organization'));
});
