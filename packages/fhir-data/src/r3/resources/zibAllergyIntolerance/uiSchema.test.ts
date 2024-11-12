import { expectJson } from '$test';
import { test } from 'vitest';
import { type AllergyIntolerance } from 'fhir/r3';
import inputFhirData from './fixtures/zib-AllergyIntolerance-01.json';
import { uiSchema } from './uiSchema';
import { zibAllergyIntolerance } from './zibAllergyIntolerance';

const zibData = zibAllergyIntolerance.parse(inputFhirData as AllergyIntolerance);

test('uiSchema returns the expected output', () => {
    const zibUiSchema = uiSchema(zibData);
    expectJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/zib-AllergyIntolerance-01-uiSchema.snap.json'
    );
});
