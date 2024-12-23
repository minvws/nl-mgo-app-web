import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MultipleValues, type SingleValue, type UiFunction } from '../../types';
import { multipleValues } from './multipleValues';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';

type TestData = {
    foo: string;
};

export const singleValueEntry: UiFunction<TestData, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'SINGLE_VALUE',
        display: value?.foo,
        ...options,
    };
};

export const multipleValuesEntry: UiFunction<TestData, MultipleValues> = (
    label,
    value,
    options
) => {
    return {
        label,
        type: 'MULTIPLE_VALUES',
        display: [value?.foo].filter(isNonNullish),
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

    const label = faker.custom.messageId();
    const uiMultipleValues = multipleValues(faker.custom.i18nContext());
    const result = uiMultipleValues(label, data, singleValueEntry);

    expect(result).toEqual({
        label: `intl(${label})`,
        display: [value1, value2],
        type: 'MULTIPLE_VALUES',
    });
});

test('combines multiple - multiple values for a single multiple grouped values', () => {
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

    const label = faker.custom.messageId();
    const uiMultipleValues = multipleValues(faker.custom.i18nContext());
    const result = uiMultipleValues(label, data, multipleValuesEntry);

    expect(result).toEqual({
        label: `intl(${label})`,
        display: [[value1], [value2]],
        type: 'MULTIPLE_GROUPED_VALUES',
    });
});
