import { expect, test } from 'vitest';
import { getProfileKey } from './getProfileKey';

test('creates a snake_cased key that is used for translations', () => {
    const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient';
    const fhirVersion = 'R3';
    const result = getProfileKey(fhirVersion, profile);
    expect(result).toBe('r3.nl_core_patient');
});
