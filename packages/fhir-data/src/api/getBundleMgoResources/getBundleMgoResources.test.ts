import { faker } from '$test';
import { expect, test } from 'vitest';
import { zibMedicationUse } from '../../resources/zibMedicationUse/zibMedicationUse';
import { getBundleMgoResources } from './getBundleMgoResources';

test('returns the expected output', () => {
    const fhirResource1 = faker.fhir.medicationStatement({
        meta: { profile: [zibMedicationUse.profile] },
    });
    const fhirResource2 = faker.fhir.medicationStatement({
        meta: { profile: [zibMedicationUse.profile] },
    });
    const fhirBundle = faker.fhir.bundle({
        entry: [{ resource: fhirResource1 }, { resource: fhirResource2 }],
    });

    const mgoResource1 = zibMedicationUse.parse(fhirResource1);
    const mgoResource2 = zibMedicationUse.parse(fhirResource2);

    const results = getBundleMgoResources(fhirBundle);
    expect(results).toEqual([mgoResource1, mgoResource2]);
});

test('returns undefined if there are no resources', () => {
    const bundle = faker.fhir.bundle({
        entry: [],
    });

    const results = getBundleMgoResources(bundle);
    expect(results).toBeUndefined();
});
