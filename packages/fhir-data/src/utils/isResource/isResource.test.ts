import { expect, test } from 'vitest';
import { type FhirResource, type ResourceType } from '../../fhir';
import { isResource } from './isResource';

test.each<[FhirResource | undefined, ResourceType, boolean]>([
    [{ resourceType: 'Bundle', type: 'searchset' }, 'Bundle', true],
    [{ resourceType: 'Patient' }, 'Bundle', false],
    [{ resourceType: 'Patient' }, 'Patient', true],
    [undefined, 'Patient', false],
])('isResource correctly returns whether resource %j is of type %j', (resource, type, expected) => {
    expect(isResource(resource, type)).toEqual(expected);
});
