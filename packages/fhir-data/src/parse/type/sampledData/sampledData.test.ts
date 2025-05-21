import { expect, test } from 'vitest';
import { sampledData } from './sampledData';

import { type SampledData } from 'fhir/r3';
import fhirData from './fixtures/fhir-data.json';

test('sampledData', async () => {
    const value = fhirData as SampledData;
    const mgoSampledData = sampledData(value);

    await expect(mgoSampledData).toMatchFileSnapshot('./fixtures/mgo-data.snap.json');
});
