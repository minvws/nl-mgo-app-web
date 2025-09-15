import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type AllergyIntolerance } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { zibAllergyIntolerance } from './zibAllergyIntolerance.js';

test('01: mgo-resource', async () => {
    const output = zibAllergyIntolerance.parse(inputFhirData01 as AllergyIntolerance);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = zibAllergyIntolerance.parse(inputFhirData01 as AllergyIntolerance);
    const zibUiSchema = zibAllergyIntolerance.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = zibAllergyIntolerance.parse(inputFhirData02 as AllergyIntolerance);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = zibAllergyIntolerance.parse(inputFhirData02 as AllergyIntolerance);
    const zibUiSchema = zibAllergyIntolerance.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
