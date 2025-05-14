import { expectJson } from '$test';
import { type HumanName } from 'fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json';
import { parseNlCoreHumanname } from './nlCoreHumanname';

test('01: mgo-resource', async () => {
    const output = parseNlCoreHumanname(inputFhirData01 as HumanName);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});
