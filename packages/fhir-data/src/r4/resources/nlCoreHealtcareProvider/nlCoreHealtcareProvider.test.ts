import { expectJson, testUiSchemaContext } from '$test';
import { message } from '$test/i18n';
import { type Location } from 'fhir/r4';
import { expect, test } from 'vitest';
import input1 from './fixtures/01/fhir-resource.json';
import { nlCoreHealtcareProvider } from './nlCoreHealtcareProvider';

test('returns the expected output 01', () => {
    const output = nlCoreHealtcareProvider.parse(input1 as Location);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = nlCoreHealtcareProvider.parse(input1 as Location);
    const uiSchema = nlCoreHealtcareProvider.uiSchema(output, testUiSchemaContext());
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCoreHealtcareProvider.parse(input1 as Location);
    output.managingOrganization = undefined;
    const uiSchema = nlCoreHealtcareProvider.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toEqual(message('r4.nl_core_healtcare_provider'));
});
