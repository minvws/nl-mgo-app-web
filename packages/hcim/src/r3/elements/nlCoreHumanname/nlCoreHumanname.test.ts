import { expectJson, testSchemaContext } from '$test';
import { type HumanName } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import inputFhirData01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import { parseNlCoreHumanname } from './nlCoreHumanname.js';
import { nlCoreHumannameSummary } from './summary.js';

test('01: mgo-resource', async () => {
    const output = parseNlCoreHumanname(inputFhirData01 as HumanName);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: mgo-resource summary', async () => {
    const output = parseNlCoreHumanname(inputFhirData01 as HumanName);
    const summary = nlCoreHumannameSummary(output, testSchemaContext({ isSummary: true }));
    await expectJson(summary).toMatchFileSnapshot('./fixtures/01/summary.snap.json');
});
