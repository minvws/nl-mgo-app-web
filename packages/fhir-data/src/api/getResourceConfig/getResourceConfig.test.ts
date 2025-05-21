import { faker } from '$test';
import { FhirVersion } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { zibMedicationAgreement } from '../../r3/resources/zibMedicationAgreement/zibMedicationAgreement';
import { zibMedicationUse } from '../../r3/resources/zibMedicationUse/zibMedicationUse';
import { r4NlCorePatient } from '../../r4/resources/nlCorePatient/nlCorePatient';
import { getResourceConfig } from './getResourceConfig';

test('returns the correct resource config for a R3 resource', () => {
    const config = getResourceConfig(zibMedicationUse.profile, FhirVersion.R3);
    expect(config).toBe(zibMedicationUse);
});

test('returns the correct resource config for a R4 resource', () => {
    const config = getResourceConfig(r4NlCorePatient.profile, FhirVersion.R4);
    expect(config).toBe(r4NlCorePatient);
});

test('matching is case insensitive for a R3 resource', () => {
    const config = getResourceConfig(zibMedicationUse.profile.toUpperCase(), FhirVersion.R3);
    expect(config).toBe(zibMedicationUse);
});
test('matching is case insensitive for a R4 resource', () => {
    const config = getResourceConfig(r4NlCorePatient.profile.toUpperCase(), FhirVersion.R4);
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
        FhirVersion.R3
    );

    expect(config).toBe(zibMedicationUse);
});
test('returns undefined if no resource config matches the profile and fhir version', () => {
    const config = getResourceConfig([faker.lorem.word(), faker.lorem.word()], FhirVersion.R3);

    expect(config).toBe(undefined);
});
