import type { Device } from '../../fhir';
import inputFhirData from './fixtures/zib-MedicalDeviceProduct-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { zibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

test('parseZibMedicalDeviceProduct returns the expected output', () => {
    const output = zibMedicalDeviceProduct.parse(inputFhirData as Device);
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-MedicalDeviceProduct-01-output.snap.json'
    );
});
