import { faker } from '$test';
import { expect, test } from 'vitest';
import { zibMedicationAgreement } from '../../r3/resources/zibMedicationAgreement/zibMedicationAgreement.js';
import { zibMedicationUse } from '../../r3/resources/zibMedicationUse/zibMedicationUse.js';
import { r4NlCorePatient } from '../../r4/resources/nlCorePatient/nlCorePatient.js';
import { getResourceConfig } from './getResourceConfig.js';

test('returns the correct resource config for a R3 resource', () => {
    const config = getResourceConfig(zibMedicationUse.profile, 'R3');
    expect(config).toBe(zibMedicationUse);
});

test('returns the correct resource config for a R4 resource', () => {
    const config = getResourceConfig(r4NlCorePatient.profile, 'R4');
    expect(config).toBe(r4NlCorePatient);
});

test('matching is case insensitive for a R3 resource', () => {
    const config = getResourceConfig(zibMedicationUse.profile.toUpperCase(), 'R3');
    expect(config).toBe(zibMedicationUse);
});
test('matching is case insensitive for a R4 resource', () => {
    const config = getResourceConfig(r4NlCorePatient.profile.toUpperCase(), 'R4');
    expect(config).toBe(r4NlCorePatient);
});

test('returns the first resource config that is found when given an array of profile', () => {
    const config = getResourceConfig(
        [
            faker.lorem.word(),
            zibMedicationUse.profile,
            faker.lorem.word(),
            zibMedicationAgreement.profile,
        ],
        'R3'
    );

    expect(config).toBe(zibMedicationUse);
});
test('returns undefined if no resource config matches the profile and fhir version', () => {
    const config = getResourceConfig([faker.lorem.word(), faker.lorem.word()], 'R3');

    expect(config).toBe(undefined);
});
