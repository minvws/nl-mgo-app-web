import { expect, test } from 'vitest';
import { timing } from './timing';

import { type Timing } from 'fhir/r3';
import fhirData01 from './fixtures/01/fhir-data.json';
import fhirData02 from './fixtures/02/fhir-data.json';

test('timing', async () => {
    const value = fhirData01 as Timing;
    await expect(timing(value)).toMatchFileSnapshot('./fixtures/01/mgo-data.snap.json');
});

test('timing without repeat', async () => {
    const value = fhirData02 as Timing;
    await expect(timing(value)).toMatchFileSnapshot('./fixtures/02/mgo-data.snap.json');
});
