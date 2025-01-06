import { expect, test } from 'vitest';
import { zibMedicationUse } from '../../r3/resources/zibMedicationUse/zibMedicationUse';
import { zibMedicationAgreement } from '../../r3/resources/zibMedicationAgreement/zibMedicationAgreement';
import { FhirVersion } from '../../types/Fhir';
import { getResourceConfig } from './getResourceConfig';
import { r4NlCorePatient } from '../../r4/resources/nlCorePatient/nlCorePatient';
import { faker } from '$test';

test('returns the correct resource config for a R3 resource', () => {
    const config = getResourceConfig(zibMedicationUse.profile, FhirVersion.R3);
    expect(config).toBe(zibMedicationUse);
});

test('returns the correct resource config for a R4 resource', () => {
    const config = getResourceConfig(r4NlCorePatient.profile, FhirVersion.R4);
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
