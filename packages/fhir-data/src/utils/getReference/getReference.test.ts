import { expect, test } from 'vitest';
import { type Reference, type Bundle, type FhirResource } from '../../fhir';
import { getReference } from './getReference';

test('getReference returns undefined when there is no bundle', () => {
    const reference: Reference = {};
    const bundle = undefined;
    expect(getReference(bundle, reference)).toBeUndefined();
});

test('getReference returns undefined when there are no entries', () => {
    const reference: Reference = {};
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
    };
    expect(getReference(bundle, reference)).toBeUndefined();
});

test('getReference returns undefined when entries is empty', () => {
    const reference: Reference = {};
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [],
    };
    expect(getReference(bundle, reference)).toBeUndefined();
});

test('getReference returns undefined when there is no reference', () => {
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [{}],
    };
    expect(getReference(bundle)).toBeUndefined();
});

test('getReference returns undefined when no reference is found', () => {
    const reference: Reference = {
        reference: 'Patient/1',
    };
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [
            {
                fullUrl: 'https://fhir.mock/Patient/0',
                resource: {
                    resourceType: 'Patient',
                    id: '0',
                },
            },
        ],
    };
    expect(getReference(bundle, reference)).toBeUndefined();
});

test('getReference returns the reference resource', () => {
    const referenced: FhirResource = {
        resourceType: 'Patient',
        id: '1',
    };

    const reference: Reference = {
        reference: 'Patient/1',
    };

    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [
            {
                fullUrl: 'https://fhir.mock/Patient/0',
                resource: {
                    resourceType: 'Patient',
                    id: '0',
                },
            },
            {
                fullUrl: 'https://fhir.mock/Patient/1',
                resource: referenced,
            },
        ],
    };
    expect(getReference(bundle, reference)).toBe(referenced);
});
