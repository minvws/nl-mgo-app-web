import { expectJson } from '$test';
import { type ContactPoint } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import inputFhirData03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import { parseNlCoreContactpoint } from './nlCoreContactpoint.js';

test('01: mgo-resource', async () => {
    const output = parseNlCoreContactpoint(inputFhirData01 as ContactPoint);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('02: mgo-resource', async () => {
    const output = parseNlCoreContactpoint(inputFhirData02 as ContactPoint);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('03: mgo-resource', async () => {
    const output = parseNlCoreContactpoint(inputFhirData03 as ContactPoint);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});
