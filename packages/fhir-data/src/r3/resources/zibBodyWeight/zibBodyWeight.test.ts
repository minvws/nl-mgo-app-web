import input from './fixtures/fhir-resource.json';

import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { type Observation } from 'fhir/r3';
import { zibBodyWeight } from './zibBodyWeight';

test('returns the expected output 01', () => {
    const output = zibBodyWeight.parse(input as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const output = zibBodyWeight.parse(input as Observation);
    const uiSchema = zibBodyWeight.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});
