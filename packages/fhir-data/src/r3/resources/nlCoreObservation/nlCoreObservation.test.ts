import input from './fixtures/fhir-resource.json';

import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { type Observation } from 'fhir/r3';
import { nlCoreObservation } from './nlCoreObservation';

test('returns the expected output', () => {
    const output = nlCoreObservation.parse(input as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = nlCoreObservation.parse(input as Observation);
    const uiSchema = nlCoreObservation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
