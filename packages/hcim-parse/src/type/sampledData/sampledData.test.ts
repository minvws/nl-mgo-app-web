import { expect, test } from 'vitest';
import { sampledData } from './sampledData.js';

import { type SampledData } from '@minvws/mgo-fhir/r3';
import fhirData from './fixtures/fhir-data.json' with { type: 'json' };

test('sampledData', async () => {
    const value = fhirData as SampledData;
    const mgoSampledData = sampledData(value);

    await expect(mgoSampledData).toMatchFileSnapshot('./fixtures/mgo-data.snap.json');
});
