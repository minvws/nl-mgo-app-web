import { faker } from '$test';
import { type MedicationStatement } from 'fhir/r3';
import { type Patient } from 'fhir/r4';
import { expect, test, vi } from 'vitest';
import { zibMedicationUse } from '../../r3/resources/zibMedicationUse/zibMedicationUse';
import { nlCorePatientR4 } from '../../r4/resources';
import { FhirVersion } from '../../types/Fhir';
import { getMgoResource } from './getMgoResource';

test('returns the expected output for a R3 Fhir resource', () => {
    const fhirResource = {
        meta: {
            profile: [zibMedicationUse.profile],
        },
    } as MedicationStatement;
    const expectedResult = zibMedicationUse.parse(fhirResource);
    const result = getMgoResource(fhirResource, FhirVersion.R3);
    expect(result).toEqual(expectedResult);
    expect(result?.fhirVersion).toEqual(FhirVersion.R3);
});

test('returns the expected output for a R4 Fhir resource', () => {
    const fhirResource = {
        meta: {
            profile: [nlCorePatientR4.profile],
        },
    } as Patient;
    const expectedResult = nlCorePatientR4.parse(fhirResource);
    const result = getMgoResource(fhirResource, FhirVersion.R4);
    expect(result).toEqual(expectedResult);
    expect(result?.fhirVersion).toEqual(FhirVersion.R4);
});

test.each([{ profile: [faker.lorem.word()] }, { profile: undefined }])(
    'logs error if no config could be found',
    (meta) => {
        const fhirResource = faker.fhir.medicationStatement({
            meta,
        });

        const mockErrorLog = vi.spyOn(console, 'error');
        mockErrorLog.mockImplementationOnce(() => {});
        const fhirVersion = faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]);
        const result = getMgoResource(fhirResource, fhirVersion);

        expect(mockErrorLog).toBeCalledWith(
            `No config found for fhir resourceType: "${fhirResource.resourceType}" with profile: "${meta.profile}" for fhir version: "${fhirVersion}"`
        );
        expect(result).toBeUndefined();
    }
);
