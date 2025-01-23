import { faker } from '$test';
import { FhirVersion, type FhirResource } from '@minvws/mgo-fhir-types';
import { type Patient as R3Patient } from 'fhir/r3';
import { type Patient as R4Patient } from 'fhir/r4';
import { expect, test, vi } from 'vitest';
import { nlCorePatient as r3NlCorePatient } from '../../r3/resources';
import { r4NlCorePatient } from '../../r4/resources';
import { getMgoResource } from './getMgoResource';

test('returns the expected output for a R3 Fhir resource', () => {
    const fhirResource: R3Patient = {
        meta: {
            profile: [r3NlCorePatient.profile],
        },
        resourceType: 'Patient',
    };
    const expectedResult = r3NlCorePatient.parse(fhirResource);
    const result = getMgoResource(fhirResource, { fhirVersion: FhirVersion.R3 });
    expect(result).toEqual(expectedResult);
    expect(result?.fhirVersion).toEqual(FhirVersion.R3);
});

test('returns the expected output for a R4 Fhir resource', () => {
    const fhirResource: R4Patient = {
        meta: {
            profile: [r4NlCorePatient.profile],
        },
        resourceType: 'Patient',
    };
    const expectedResult = r4NlCorePatient.parse(fhirResource);
    const result = getMgoResource(fhirResource, { fhirVersion: FhirVersion.R4 });
    expect(result).toEqual(expectedResult);
    expect(result?.fhirVersion).toEqual(FhirVersion.R4);
});

test.each([
    { profile: [faker.lorem.word()], resourceType: 'Patient' },
    { profile: undefined, resourceType: 'Patient' },
])('logs error if no config could be found', (meta) => {
    const fhirResource = faker.fhir.medicationStatement({
        meta,
    });

    const mockErrorLog = vi.spyOn(console, 'error');
    mockErrorLog.mockImplementationOnce(() => {});
    const result = getMgoResource(fhirResource, {
        fhirVersion: FhirVersion.R3,
    });

    expect(mockErrorLog).toBeCalledWith(
        `No config found for fhir resourceType: "${fhirResource.resourceType}" with profile: "${meta.profile}" for fhir version: "${FhirVersion.R3}"`
    );
    expect(result).toBeUndefined();
});

test('throws if the input is NOT a fhir resource', () => {
    expect(() => getMgoResource({} as unknown as FhirResource)).toThrowError(
        `input does not seem to be a valid Fhir Resource. Received resourceType: "undefined"`
    );
});
