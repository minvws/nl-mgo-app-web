import { faker } from '$test';
import { expect, test } from 'vitest';
import { type SingleValue, type UiFunction } from '../../types';
import { multipleValue } from './multipleValue';

type TestData = {
    foo: string;
};

export const ui: UiFunction<TestData, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'ui',
        display: value?.foo,
        ...options,
    };
};

test('combines multiple display values for a single ValueDescription', () => {
    const value1 = faker.lorem.word();
    const value2 = faker.lorem.word();
    const data: TestData[] = [
        {
            foo: value1,
        },
        {
            foo: value2,
        },
    ];

    const label = faker.lorem.word();
    const result = multipleValue(label, data, ui);

    expect(result).toEqual({
        label,
        display: [value1, value2],
        type: 'ui',
    });
});
