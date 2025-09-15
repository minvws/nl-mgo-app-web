import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type PractitionerRole } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import input04 from './fixtures/04/fhir-resource.json' with { type: 'json' };
import input05 from './fixtures/05/fhir-resource.json' with { type: 'json' };
import { nlCorePractitionerRole } from './nlCorePractitionerRole.js';

test('01: mgo-resource', async () => {
    const output = nlCorePractitionerRole.parse(input01 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = nlCorePractitionerRole.parse(input02 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('03: mgo-resource', async () => {
    const output = nlCorePractitionerRole.parse(input03 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('04: mgo-resource', async () => {
    const output = nlCorePractitionerRole.parse(input04 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resource.snap.json');
});

test('05: mgo-resource', async () => {
    const output = nlCorePractitionerRole.parse(input05 as PractitionerRole);
    await expectJson(output).toMatchFileSnapshot('./fixtures/05/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCorePractitionerRole.parse(input01 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output, testSchemaContext());
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCorePractitionerRole.parse(input02 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: ui-schema', async () => {
    const output = nlCorePractitionerRole.parse(input03 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('04: ui-schema', async () => {
    const output = nlCorePractitionerRole.parse(input04 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/04/ui-schema.snap.json'
    );
});

test('05: ui-schema', async () => {
    const output = nlCorePractitionerRole.parse(input05 as PractitionerRole);
    const uiSchema = nlCorePractitionerRole.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/05/ui-schema.snap.json'
    );
});
