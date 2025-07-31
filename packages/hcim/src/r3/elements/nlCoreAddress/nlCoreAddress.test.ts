import { expectJson } from '$test';
import { type Address } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { parseNlCoreAddress } from './nlCoreAddress.js';

test('01: mgo-resource', async () => {
    const output = parseNlCoreAddress(inputFhirData01 as Address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = parseNlCoreAddress(inputFhirData02 as Address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});
