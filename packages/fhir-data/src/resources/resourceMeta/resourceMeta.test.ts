import expected01 from './fixtures/zib-Product-01-output.json';
import input01 from './fixtures/zib-Product-01.json';

import { expect, test } from 'vitest';
import { type Resource } from '../../fhir';
import { parseResourceMeta } from './resourceMeta';

test('returns the expected output', () => {
    const resourceMeta = parseResourceMeta(
        input01 as Resource,
        'http://nictiz.nl/fhir/StructureDefinition/zib-Product'
    );
    expect(resourceMeta).toEqual(expected01);
});

test('throws if the provided profile can not be found in the resource', () => {
    expect(() => {
        parseResourceMeta(
            {
                meta: {
                    profile: undefined,
                },
            } as Resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Product'
        );
    }).toThrowError(
        'Resource does not have the expected profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Product". Got: undefined'
    );
});
