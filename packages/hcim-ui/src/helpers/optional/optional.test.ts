import { faker } from '$test';
import { expect, test } from 'vitest';
import { UiElement } from '../../types/schema.js';
import { optional } from './optional.js';

test('returns the element when it is not empty', () => {
    const element: UiElement = faker.ui.singleValue();
    const result = optional(element);

    expect(result).toEqual([element]);
});

test('returns an empty array when the element is empty', () => {
    const element: UiElement = {
        ...faker.ui.singleValue(),
        value: undefined,
    };
    const result = optional(element);

    expect(result).toEqual([]);
});

test('returns an empty array when the element is an array and all elements are empty', () => {
    const elements: UiElement[] = [
        { ...faker.ui.singleValue(), value: undefined },
        { ...faker.ui.singleValue(), value: undefined },
    ];
    const result = optional(elements);

    expect(result).toEqual([]);
});

test('returns the elements when the element is an array and some elements are not empty', () => {
    const elements: UiElement[] = [
        { ...faker.ui.singleValue(), value: undefined },
        faker.ui.singleValue(),
    ];
    const result = optional(elements);

    expect(result).toEqual([elements[1]]);
});
