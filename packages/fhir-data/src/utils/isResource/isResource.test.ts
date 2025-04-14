import { type FhirResource, type ResourceType } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { isFhirResource } from './isResource';

test.each<[FhirResource, ResourceType, boolean]>([
    [{ resourceType: 'Bundle', type: 'searchset' }, 'Bundle', true],
    [{ resourceType: 'Patient' }, 'Bundle', false],
    [{ resourceType: 'Patient' }, 'Patient', true],
])('isResource correctly returns whether resource %j is of type %j', (resource, type, expected) => {
    expect(isFhirResource(resource, type)).toEqual(expected);
});

test.each<[unknown, boolean]>([
    [{ resourceType: 'Bundle', type: 'searchset' }, true],
    [{ resourceType: 'Patient' }, true],
    [{ resourceType: 'FooBar' }, true],
    [{}, false],
    ['', false],
])(
    'isResource correctly returns whether resource %j is probably a FhirResource ',
    (resource, expected) => {
        expect(isFhirResource(resource as FhirResource)).toEqual(expected);
    }
);
