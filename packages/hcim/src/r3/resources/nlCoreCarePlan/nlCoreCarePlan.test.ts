import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type CarePlan } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { nlCoreCarePlan } from './nlCoreCarePlan.js';

test('01: mgo-resource', async () => {
    const output = nlCoreCarePlan.parse(input01 as CarePlan);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreCarePlan.parse(input01 as CarePlan);
    const uiSchema = nlCoreCarePlan.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCoreCarePlan.parse(input02 as CarePlan);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCoreCarePlan.parse(input02 as CarePlan);
    const uiSchema = nlCoreCarePlan.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = nlCoreCarePlan.parse(input03 as CarePlan);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const output = nlCoreCarePlan.parse(input03 as CarePlan);
    const uiSchema = nlCoreCarePlan.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});
