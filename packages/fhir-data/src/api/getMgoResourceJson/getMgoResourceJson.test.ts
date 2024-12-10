import { expect, test } from 'vitest';
import { getMgoResourceJson } from './getMgoResourceJson';
import { FhirVersion } from '../../types/Fhir';

test('returns the expected output for fhirversion R3', () => {
    const resource = JSON.stringify({
        resourceType: 'MedicationStatement',
        meta: { profile: ['http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse'] },
    });
    const resultJson = getMgoResourceJson(resource);

    expect(() => JSON.parse(resultJson!)).not.toThrow();
    expect(JSON.parse(resultJson!).fhirVersion).toEqual(FhirVersion.R3);
});

test('returns the expected output for fhirversion R4', () => {
    const resource = JSON.stringify({
        resourceType: 'Immunization',
        meta: {
            profile: ['http://nictiz.nl/fhir/StructureDefinition/nl-core-Vaccination-event'],
        },
    });
    const resultJson = getMgoResourceJson(resource, FhirVersion.R4);

    expect(() => JSON.parse(resultJson!)).not.toThrow();
    expect(JSON.parse(resultJson!).fhirVersion).toEqual(FhirVersion.R4);
});

test('throws if the input is a fhir resource', () => {
    expect(() => getMgoResourceJson('{}')).toThrowError(
        `input does not seem to be a valid Fhir Resource. Received resourceType: "undefined"`
    );
});
