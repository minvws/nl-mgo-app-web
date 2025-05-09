import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Organization } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { nlCoreOrganization } from './nlCoreOrganization';

test('01: mgo-resource', async () => {
    const output = nlCoreOrganization.parse(input01 as Organization);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = nlCoreOrganization.parse(input02 as Organization);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('03: mgo-resource', async () => {
    const output = nlCoreOrganization.parse(input03 as Organization);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreOrganization.parse(input01 as Organization);
    const uiSchema = nlCoreOrganization.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const output = nlCoreOrganization.parse(input02 as Organization);
    const uiSchema = nlCoreOrganization.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: ui-schema', async () => {
    const output = nlCoreOrganization.parse(input03 as Organization);
    const uiSchema = nlCoreOrganization.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});
