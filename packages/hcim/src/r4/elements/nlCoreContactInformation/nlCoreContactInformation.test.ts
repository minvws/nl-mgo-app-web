import { expectJson } from '$test';
import { type ContactPoint } from '@minvws/mgo-fhir/r4';
import { expect, test } from 'vitest';

import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import { parseNlCoreContactInformation } from './nlCoreContactInformation.js';

test('returns the expected output 01', async () => {
    const telecom = input01 as ContactPoint[];
    const output = parseNlCoreContactInformation(telecom);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resources.snap.json');
});

test('returns the expected output 02', async () => {
    const telecom = undefined;
    const output = parseNlCoreContactInformation(telecom);
    const expected = {
        telephoneNumbers: [],
        emailAddresses: [],
    };
    await expect(output).toEqual(expected);
});
