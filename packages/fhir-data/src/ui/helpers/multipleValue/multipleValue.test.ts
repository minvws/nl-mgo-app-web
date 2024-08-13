import { faker } from '$test';
import { expect, test } from 'vitest';
import { type ValueOptions, type ValueDescription } from '../../types';
import { multipleValue } from './multipleValue';
import { type Nullable } from '../../../types/Nullable';

type TestData = {
    foo: string;
};

function ui(label: string, value: Nullable<TestData>, options?: ValueOptions) {
    return {
        label,
        type: 'ui',
        display: value?.foo || null,
        ...options,
    } satisfies ValueDescription;
}

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
