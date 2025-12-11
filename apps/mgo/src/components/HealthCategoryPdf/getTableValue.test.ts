import { type UiElement } from '@minvws/mgo-hcim-ui';
import { expect, test } from 'vitest';
import { getTableValue, TableValue } from './getTableValue';

const cases: [UiElement, TableValue][] = [
    [
        { type: 'SINGLE_VALUE', label: 'label', value: { display: 'display' } },
        {
            label: 'label',
            value: 'display',
        },
    ],
    [
        {
            type: 'MULTIPLE_VALUES',
            label: 'label',
            value: [{ display: 'display' }, { display: 'display2' }],
        },
        {
            label: 'label',
            value: 'display, display2',
        },
    ],
    [
        {
            type: 'MULTIPLE_GROUPED_VALUES',
            label: 'label',
            value: [[{ display: 'display' }, { display: 'display2' }]],
        },
        {
            label: 'label',
            value: 'display, display2',
        },
    ],
    [
        { type: 'REFERENCE_VALUE', label: 'label', display: 'display', reference: 'reference' },
        {
            label: 'label',
            value: 'display',
        },
    ],
    [
        { type: 'DOWNLOAD_LINK', label: 'label', url: 'url' },
        {
            label: 'label',
            value: 'url',
        },
    ],
    [
        { type: 'DOWNLOAD_BINARY', label: 'label' },
        {
            label: 'label',
            value: '-',
        },
    ],
    [
        { type: 'REFERENCE_LINK', label: 'label', reference: 'reference' },
        {
            label: 'label',
            value: 'reference',
        },
    ],
];

test.each(cases)(
    'should return the correct label and value for the different ui element types',
    (uiElement, expectedValue) => {
        const result = getTableValue(uiElement);

        expect(result.label).toBe(expectedValue.label);
        expect(result.value).toBe(expectedValue.value);
    }
);

test('should throw an error for unknown UiElement type', () => {
    const invalidElement = {
        type: 'UNKNOWN_TYPE',
        label: 'Test Label',
    } as unknown as UiElement;

    expect(() => getTableValue(invalidElement)).toThrowError('Unknown UiElement type');
});
