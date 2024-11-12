import expected01 from './fixtures/zib-Product-01-output.json';
import input01 from './fixtures/zib-Product-01.json';

import { expect, test } from 'vitest';
import { resourceMeta } from './resourceMeta';
import { type Resource } from '../../../types/FhirRX';
import { FhirVersion } from '../../../types/Fhir';

test('returns the expected output', () => {
    const result = resourceMeta(
        input01 as Resource,
        'http://nictiz.nl/fhir/StructureDefinition/zib-Product',
        FhirVersion.R3
    );
    expect(result).toEqual(expected01);
});

test('throws if the provided profile can not be found in the resource', () => {
    expect(() => {
        resourceMeta(
            {
                meta: {
                    profile: undefined,
                },
            } as Resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Product',
            FhirVersion.R3
        );
    }).toThrowError(
        'Resource does not have the expected profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Product". Got: undefined'
    );
});
