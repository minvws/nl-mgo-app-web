import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup } from '../../types/index.js';
import { getChildren } from './getChildren.js';

test('returns an empty array is value is nullish', () => {
    expect(getChildren(null)).toEqual([]);
    expect(getChildren(undefined)).toEqual([]);
});

test('returns all children for a UiGroup', () => {
    const groupLabel = faker.lorem.word();
    const child1Label = faker.lorem.word();
    const child2Label = faker.lorem.word();
    const child3Label = faker.lorem.word();
    const group: HealthUiGroup = {
        id: groupLabel,
        label: groupLabel,
        children: [
            {
                id: child1Label,
                type: 'SINGLE_VALUE',
                label: child1Label,
                value: { display: faker.lorem.word() },
            },
            {
                id: child2Label,
                type: 'SINGLE_VALUE',
                label: child2Label,
                value: { display: faker.lorem.word() },
            },
            {
                id: child3Label,
                type: 'SINGLE_VALUE',
                label: child3Label,
                value: { display: faker.lorem.word() },
            },
        ],
    };

    const children = getChildren(group);
    expect(children).toEqual(group.children);
});

test('returns all children for multiple UiGroups', () => {
    const group1Label = faker.lorem.word();
    const group1Child1Label = faker.lorem.word();
    const group1Child2Label = faker.lorem.word();
    const group1Child3Label = faker.lorem.word();
    const group1: HealthUiGroup = {
        id: group1Label,
        label: group1Label,
        children: [
            {
                id: group1Child1Label,
                type: 'SINGLE_VALUE',
                label: group1Child1Label,
                value: { display: faker.lorem.word() },
            },
            {
                id: group1Child2Label,
                type: 'SINGLE_VALUE',
                label: group1Child2Label,
                value: { display: faker.lorem.word() },
            },
            {
                id: group1Child3Label,
                type: 'SINGLE_VALUE',
                label: group1Child3Label,
                value: { display: faker.lorem.word() },
            },
        ],
    };

    const group2Label = faker.lorem.word();
    const group2Child1Label = faker.lorem.word();
    const group2: HealthUiGroup = {
        id: group2Label,
        label: group2Label,
        children: [
            {
                id: group2Child1Label,
                type: 'SINGLE_VALUE',
                label: group2Child1Label,
                value: { display: faker.lorem.word() },
            },
        ],
    };

    const children = getChildren([group1, group2]);
    expect(children).toEqual([...group1.children, ...group2.children]);
});
