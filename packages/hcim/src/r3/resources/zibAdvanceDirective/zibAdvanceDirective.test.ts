import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Consent } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import inputFhirData03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { zibAdvanceDirective } from './zibAdvanceDirective.js';

test('01: mgo-resource', async () => {
    const output = zibAdvanceDirective.parse(inputFhirData01 as Consent);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibAdvanceDirective.parse(inputFhirData01 as Consent);
    const schema = zibAdvanceDirective.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibAdvanceDirective.parse(inputFhirData02 as Consent);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibAdvanceDirective.parse(inputFhirData02 as Consent);
    const schema = zibAdvanceDirective.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = zibAdvanceDirective.parse(inputFhirData03 as Consent);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const mgoResource = zibAdvanceDirective.parse(inputFhirData03 as Consent);
    const schema = zibAdvanceDirective.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});
