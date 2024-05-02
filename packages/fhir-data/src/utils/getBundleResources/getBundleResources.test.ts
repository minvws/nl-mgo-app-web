import { expect, test } from 'vitest';
import { type Bundle } from '../../fhir';
import { getBundleResources } from './getBundleResources';

test('returns empty array when there are no entries', () => {
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
    };
    expect(getBundleResources(bundle)).toEqual([]);
});

test('returns empty array when entries is empty', () => {
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [],
    };
    expect(getBundleResources(bundle)).toEqual([]);
});

test('returns empty array when entries do not contain resources', () => {
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [{}, {}, {}],
    };
    expect(getBundleResources(bundle)).toEqual([]);
});

test('returns resources', () => {
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [
            { resource: { resourceType: 'Patient', birthDate: '01-01-2000' } },
            { resource: { resourceType: 'Patient', birthDate: '02-01-2000' } },
        ],
    };
    expect(getBundleResources(bundle)).toEqual([
        { resourceType: 'Patient', birthDate: '01-01-2000' },
        { resourceType: 'Patient', birthDate: '02-01-2000' },
    ]);
});

test('returns resources while ignoring undefined values', () => {
    const bundle: Bundle = {
        resourceType: 'Bundle',
        type: 'collection',
        entry: [
            { resource: undefined },
            { resource: { resourceType: 'Patient', birthDate: '01-01-2000' } },
            { resource: undefined },
            { resource: { resourceType: 'Patient', birthDate: '02-01-2000' } },
        ],
    };
    expect(getBundleResources(bundle)).toEqual([
        { resourceType: 'Patient', birthDate: '01-01-2000' },
        { resourceType: 'Patient', birthDate: '02-01-2000' },
    ]);
});
