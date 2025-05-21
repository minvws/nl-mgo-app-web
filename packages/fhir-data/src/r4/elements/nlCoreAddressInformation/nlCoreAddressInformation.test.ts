import { expectJson } from '$test';
import { type Address } from 'fhir/r4';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { parseNlCoreAddressInformation } from './nlCoreAddressInformation';

test('returns the expected output 01', async () => {
    const output = parseNlCoreAddressInformation(input01 as Address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', async () => {
    const output = parseNlCoreAddressInformation(input02 as Address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});
