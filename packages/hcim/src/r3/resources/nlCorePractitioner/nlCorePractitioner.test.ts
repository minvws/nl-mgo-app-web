import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Practitioner } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import input04 from './fixtures/04/fhir-resource.json' with { type: 'json' };
import { nlCorePractitioner } from './nlCorePractitioner.js';

test('01: mgo-resource', async () => {
    const output = nlCorePractitioner.parse(input01 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = nlCorePractitioner.parse(input02 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('03: mgo-resource', async () => {
    const output = nlCorePractitioner.parse(input03 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('04: mgo-resource', async () => {
    const output = nlCorePractitioner.parse(input04 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCorePractitioner.parse(input01 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: ui-schema', async () => {
    const output = nlCorePractitioner.parse(input02 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: ui-schema', async () => {
    const output = nlCorePractitioner.parse(input03 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('04: ui-schema', async () => {
    const output = nlCorePractitioner.parse(input04 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/04/ui-schema.snap.json'
    );
});
