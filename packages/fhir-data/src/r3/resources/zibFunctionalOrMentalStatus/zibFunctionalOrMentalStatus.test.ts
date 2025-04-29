import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Observation } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/fhir-resource.json';
import { zibFunctionalOrMentalStatus } from './zibFunctionalOrMentalStatus';

test('r01: mgo-resource', async () => {
    const output = zibFunctionalOrMentalStatus.parse(input as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = zibFunctionalOrMentalStatus.parse(input as Observation);
    const uiSchema = zibFunctionalOrMentalStatus.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema.snap.json'
    );
});
