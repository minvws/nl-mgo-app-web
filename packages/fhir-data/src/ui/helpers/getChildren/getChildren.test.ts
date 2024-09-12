import { faker } from '$test';
import { expect, test } from 'vitest';
import { type UiSchemaGroup } from '../../types';
import { getChildren } from './getChildren';

test('returns an empty array is value is nullish', () => {
    expect(getChildren(null)).toEqual([]);
    expect(getChildren(undefined)).toEqual([]);
});

test('returns all children for a UiGroup', () => {
    const group: UiSchemaGroup = {
        label: faker.lorem.word(),
        children: [
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
        ],
    };

    const children = getChildren(group);
    expect(children).toEqual(group.children);
});

test('returns all children for multiple UiGroups', () => {
    const group1: UiSchemaGroup = {
        label: faker.lorem.word(),
        children: [
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
        ],
    };

    const group2: UiSchemaGroup = {
        label: faker.lorem.word(),
        children: [
            { type: faker.lorem.word(), label: faker.lorem.word(), display: faker.lorem.word() },
        ],
    };

    const children = getChildren([group1, group2]);
    expect(children).toEqual([...group1.children, ...group2.children]);
});
