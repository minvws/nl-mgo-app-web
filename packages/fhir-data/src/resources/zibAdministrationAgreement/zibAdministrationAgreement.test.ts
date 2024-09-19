import type { MedicationDispense } from '../../fhir';
import inputFhirData from './fixtures/zib-AdministrationAgreement-01.json';

import { expectJson } from '$test';
import { test } from 'vitest';
import { zibAdministrationAgreement } from './zibAdministrationAgreement';

test('parseZibAdministrationAgreement returns the expected output', () => {
    const output = zibAdministrationAgreement.parse(inputFhirData as MedicationDispense);
    expectJson(output).toMatchFileSnapshot(
        './fixtures/zib-AdministrationAgreement-01-output.snap.json'
    );
});
