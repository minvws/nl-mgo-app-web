import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Organization } from 'fhir/r3';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { nlCoreOrganization } from './nlCoreOrganization';

test('returns the expected output 01', () => {
    const output = nlCoreOrganization.parse(input01 as Organization, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = nlCoreOrganization.parse(input02 as Organization, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', () => {
    const output = nlCoreOrganization.parse(input03 as Organization, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = nlCoreOrganization.parse(input01 as Organization, faker.custom.i18nContext());
    const uiSchema = nlCoreOrganization.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = nlCoreOrganization.parse(input02 as Organization, faker.custom.i18nContext());
    const uiSchema = nlCoreOrganization.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', () => {
    const output = nlCoreOrganization.parse(input03 as Organization, faker.custom.i18nContext());
    const uiSchema = nlCoreOrganization.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});
