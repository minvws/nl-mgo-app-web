import { expectJson, testSchemaContext } from '$test';
import { type Address } from '@minvws/mgo-fhir/r3';
import { fhirMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import inputFhirData02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import { parseNlCoreAddress } from './nlCoreAddress.js';
import { nlCoreAddressSummary } from './summary.js';

test('01: mgo-resource', async () => {
    const output = parseNlCoreAddress(inputFhirData01 as Address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: mgo-resource summary', async () => {
    const output = parseNlCoreAddress(inputFhirData01 as Address);
    const summary = nlCoreAddressSummary(output, testSchemaContext({ isSummary: true }));
    await expectJson(summary).toMatchFileSnapshot('./fixtures/01/summary.snap.json');
});

test('02: mgo-resource', async () => {
    const output = parseNlCoreAddress(inputFhirData02 as Address);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: mgo-resource summary', async () => {
    const output = parseNlCoreAddress(inputFhirData02 as Address);
    const summary = nlCoreAddressSummary(output, testSchemaContext({ isSummary: true }));
    await expectJson(summary).toMatchFileSnapshot('./fixtures/02/summary.snap.json');
});

test('summary is empty if there is not address', async () => {
    const summary = nlCoreAddressSummary(undefined, testSchemaContext({ isSummary: true }));
    await expect(summary).toEqual([
        {
            type: 'SINGLE_VALUE',
            label: fhirMessage('r3.nl_core_address'),
            value: { display: undefined },
        },
    ]);
});
