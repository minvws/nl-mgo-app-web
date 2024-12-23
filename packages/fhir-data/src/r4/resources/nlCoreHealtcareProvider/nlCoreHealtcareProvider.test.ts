import input1 from './fixtures/01/fhir-resource.json';

import { expectJson, faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { type Location } from 'fhir/r4';
import { nlCoreHealtcareProvider } from './nlCoreHealtcareProvider';
import { message } from '$test/i18n';

test('returns the expected output 01', () => {
    const output = nlCoreHealtcareProvider.parse(input1 as Location, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = nlCoreHealtcareProvider.parse(input1 as Location, faker.custom.i18nContext());
    const uiSchema = nlCoreHealtcareProvider.uiSchema(output, testUiSchemaContext());
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealtcareProvider.parse(input1 as Location, faker.custom.i18nContext());
    output.managingOrganization = undefined;
    const uiSchema = nlCoreHealtcareProvider.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toEqual(message('r4.nl_core_healtcare_provider'));
});
