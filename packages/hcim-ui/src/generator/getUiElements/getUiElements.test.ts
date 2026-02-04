import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type UiElement } from '../../types/schema.js';
import { getUiElements } from './getUiElements.js';

test('extracts all ui elements from a list of elements and groups', () => {
    const elementLabel = faker.lorem.word();
    const elements: (UiElement | HealthUiGroup)[] = [
        {
            id: elementLabel,
            label: elementLabel,
            type: 'SINGLE_VALUE',
            value: undefined,
        },
    ];
    const groupLabel = faker.lorem.word();
    const groupChildLabel = faker.lorem.word();
    const group: HealthUiGroup = {
        id: groupLabel,
        label: groupLabel,
        children: [
            {
                id: groupChildLabel,
                label: groupChildLabel,
                type: 'SINGLE_VALUE',
                value: undefined,
            },
        ],
    };
    const result = getUiElements([group, ...elements]);

    expect(result).toEqual([...group.children, ...elements]);
});
