import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Goal } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import { zibTreatmentObjective } from '././zibTreatmentObjective.js';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };

test('01: mgo-resource', async () => {
    const output = zibTreatmentObjective.parse(inputFhirData01 as Goal);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibTreatmentObjective.parse(inputFhirData01 as Goal);
    const schema = zibTreatmentObjective.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibTreatmentObjective.parse(inputFhirData02 as Goal);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibTreatmentObjective.parse(inputFhirData02 as Goal);
    const schema = zibTreatmentObjective.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(schema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
