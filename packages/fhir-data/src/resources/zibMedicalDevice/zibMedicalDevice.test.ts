import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { type DeviceUseStatement } from '../../fhir';
import { zibMedicalDevice } from './zibMedicalDevice';

test('parse returns the expected output 01', () => {
    const output = zibMedicalDevice.parse(input01 as DeviceUseStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('parse returns the expected output 02', () => {
    const output = zibMedicalDevice.parse(input02 as DeviceUseStatement);
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});
