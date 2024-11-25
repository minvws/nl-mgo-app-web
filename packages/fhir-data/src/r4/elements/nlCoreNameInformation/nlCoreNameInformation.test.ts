import { expectJson } from '$test';
import { type Patient } from 'fhir/r4';
import { test } from 'vitest';
import { nlCoreNameInformation } from './nlCoreNameInformation';

import { map } from '../../../utils';
import input01 from './fixtures/01/fhir-resource-patient.json';
import input02 from './fixtures/02/fhir-resource-patient.json';

test('returns the expected output 01', () => {
    const names = (input01 as Patient).name;
    const output = map(names, nlCoreNameInformation.parse);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resources.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const names = (input01 as Patient).name;
    const output = map(names, nlCoreNameInformation.parse, true);
    const uiSchemaGroups = map(output, nlCoreNameInformation.uiSchemaGroup);
    expectJson(uiSchemaGroups).toMatchFileSnapshot('./fixtures/01/ui-schema-groups.snap.json');
});

test('returns the expected output 02', () => {
    const names = (input02 as Patient).name;
    const output = map(names, nlCoreNameInformation.parse);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resources.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const names = (input02 as Patient).name;
    const output = map(names, nlCoreNameInformation.parse, true);
    const uiSchemaGroups = map(output, nlCoreNameInformation.uiSchemaGroup);
    expectJson(uiSchemaGroups).toMatchFileSnapshot('./fixtures/02/ui-schema-groups.snap.json');
});
