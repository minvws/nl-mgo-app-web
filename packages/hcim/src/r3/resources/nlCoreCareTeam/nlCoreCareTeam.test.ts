import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { CareTeam } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import { nlCoreCareTeam } from '././nlCoreCareTeam.js';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };

test('01: mgo-resource', async () => {
    const output = nlCoreCareTeam.parse(input01 as CareTeam);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreCareTeam.parse(input01 as CareTeam);
    const zibUiSchema = nlCoreCareTeam.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCoreCareTeam.parse(input02 as CareTeam);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCoreCareTeam.parse(input02 as CareTeam);
    const zibUiSchema = nlCoreCareTeam.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
