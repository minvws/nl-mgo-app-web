import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Patient } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import input04 from './fixtures/04/fhir-resource.json' with { type: 'json' };
import input05 from './fixtures/05/fhir-resource.json' with { type: 'json' };
import { nlCorePatient } from './nlCorePatient.js';

test('01: mgo-resource', async () => {
    const output = nlCorePatient.parse(input01 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCorePatient.parse(input01 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCorePatient.parse(input02 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCorePatient.parse(input02 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = nlCorePatient.parse(input03 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const output = nlCorePatient.parse(input03 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('04: mgo-resource', async () => {
    const output = nlCorePatient.parse(input04 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resource.snap.json');
});

test('04: ui-schema', async () => {
    const output = nlCorePatient.parse(input04 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/04/ui-schema.snap.json'
    );
});

test('05: mgo-resource', async () => {
    const output = nlCorePatient.parse(input05 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/05/mgo-resource.snap.json');
});

test('05: ui-schema', async () => {
    const output = nlCorePatient.parse(input05 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/05/ui-schema.snap.json'
    );
});
