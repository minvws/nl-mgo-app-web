import { faker } from '$test';
import { expect, test } from 'vitest';
import { type HealthUiGroup, type UiElement } from '../../types/schema';
import { getUiElements } from './getUiElements';

test('extracts all ui elements from a list of elements and groups', () => {
    const elements: (UiElement | HealthUiGroup)[] = [
        {
            label: faker.lorem.word(),
            type: 'SINGLE_VALUE',
            display: undefined,
        },
    ];
    const group: HealthUiGroup = {
        label: faker.lorem.word(),
        children: [
            {
                label: faker.lorem.word(),
                type: 'SINGLE_VALUE',
                display: undefined,
            },
        ],
    };
    const result = getUiElements([group, ...elements]);

    expect(result).toEqual([...group.children, ...elements]);
});
