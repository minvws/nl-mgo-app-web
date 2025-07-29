import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Medication } from '@minvws/mgo-fhir/r4';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { nlCorePharmaceuticalProductR4 } from './nlCorePharmaceuticalProduct.js';

test('01: mgo-resource', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input01 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input01 as Medication);
    const uiSchema = nlCorePharmaceuticalProductR4.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input02 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schemna', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input02 as Medication);
    const uiSchema = nlCorePharmaceuticalProductR4.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input03 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input03 as Medication);
    const uiSchema = nlCorePharmaceuticalProductR4.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});
