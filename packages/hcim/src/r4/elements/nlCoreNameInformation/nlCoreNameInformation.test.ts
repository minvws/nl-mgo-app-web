import { expectJson } from '$test';
import { type Patient } from '@minvws/mgo-fhir/r4';
import { test } from 'vitest';

import { map } from '@minvws/mgo-utils';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import input04 from './fixtures/04/fhir-resource.json' with { type: 'json' };
import input05 from './fixtures/05/fhir-resource.json' with { type: 'json' };
import { parseNlCoreNameInformation } from './nlCoreNameInformation.js';

test('returns the expected output 01', async () => {
    const names = (input01 as Patient).name;
    const output = map(names, parseNlCoreNameInformation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resources.snap.json');
});

test('returns the expected output 02', async () => {
    const names = (input02 as Patient).name;
    const output = map(names, parseNlCoreNameInformation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resources.snap.json');
});

test('returns the expected output 03', async () => {
    const names = (input03 as Patient).name;
    const output = map(names, parseNlCoreNameInformation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resources.snap.json');
});

test('returns the expected output 04', async () => {
    const names = (input04 as Patient).name;
    const output = map(names, parseNlCoreNameInformation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resources.snap.json');
});

test('returns the expected output 05', async () => {
    const names = (input05 as Patient).name;
    const output = map(names, parseNlCoreNameInformation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/05/mgo-resources.snap.json');
});
