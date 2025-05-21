import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup } from '../../types';
import { getChildren } from './getChildren';

test('returns an empty array is value is nullish', () => {
    expect(getChildren(null)).toEqual([]);
    expect(getChildren(undefined)).toEqual([]);
});

test('returns all children for a UiGroup', () => {
    const group: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
        ],
    };

    const children = getChildren(group);
    expect(children).toEqual(group.children);
});

test('returns all children for multiple UiGroups', () => {
    const group1: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
        ],
    };

    const group2: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [
            { type: 'SINGLE_VALUE', label: faker.lorem.word(), display: faker.lorem.word() },
        ],
    };

    const children = getChildren([group1, group2]);
    expect(children).toEqual([...group1.children, ...group2.children]);
});
