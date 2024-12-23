import input from './fixtures/fhir-resource.json';

import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import { type Observation } from 'fhir/r3';
import { nlCoreObservation } from './nlCoreObservation';

test('returns the expected output', () => {
    const output = nlCoreObservation.parse(input as Observation, faker.custom.i18nContext());
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = nlCoreObservation.parse(input as Observation, faker.custom.i18nContext());
    const uiSchema = nlCoreObservation.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
