import { faker } from '$test';
import { expect, test } from 'vitest';
import { oneOfValueX } from './oneOfValueX';
import { mockQuantity } from '../../type/quantity/quantity.test';
import { format } from '../../format';

test('valueX with string', () => {
    const label = faker.lorem.word();
    const value = faker.lorem.word();
    const input = {
        valueString: value,
    };
    const options = faker.uiSchema.valueOptions();

    const result = oneOfValueX(label, input, undefined, options);
    expect(result).toEqual([
        {
            label,
            type: 'SINGLE_VALUE',
            display: value,
            ...options,
        },
    ]);
});

test('valueX with quantity', () => {
    const label = faker.lorem.word();
    const mgoQuantity = mockQuantity();
    const input = {
        valueQuantity: mgoQuantity,
    };
    const options = faker.uiSchema.valueOptions();

    const result = oneOfValueX(label, input, undefined, options);
    expect(result).toEqual([
        {
            label: `${label}.value`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `SINGLE_VALUE`,
            display: format.codeWithSystem(mgoQuantity.code, mgoQuantity.system),
            ...options,
        },
    ]);
});

test('valueX with custom prefix', () => {
    const label = faker.lorem.word();
    const value = faker.lorem.word();
    const prefix = faker.lorem.word();
    const input = {
        [`${prefix}String`]: value,
    };
    const options = faker.uiSchema.valueOptions();

    const result = oneOfValueX(label, input, prefix, options);
    expect(result).toEqual([
        {
            label,
            type: 'SINGLE_VALUE',
            display: value,
            ...options,
        },
    ]);
});

test('valueX with null value', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();

    const result = oneOfValueX(label, null, undefined, options);
    expect(result).toEqual([]);
});

test('valueX where prefixed value not found', () => {
    const label = faker.lorem.word();
    const value = faker.lorem.word();
    const prefix = faker.lorem.word();
    const input = {
        valueString: value,
    };
    const options = faker.uiSchema.valueOptions();

    const result = oneOfValueX(label, input, prefix, options);
    expect(result).toEqual([]);
});
