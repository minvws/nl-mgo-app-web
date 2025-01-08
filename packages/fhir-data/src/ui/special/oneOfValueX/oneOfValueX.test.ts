import { faker } from '$test';
import { expect, test } from 'vitest';
import { oneOfValueX } from './oneOfValueX';
import { mockQuantity } from '../../type/quantity/quantity.test';
import { format } from '../../format';

test('valueX with string', () => {
    const label = faker.custom.messageId();
    const value = faker.lorem.word();
    const input = {
        valueString: value,
    };

    const uiOneOfValueX = oneOfValueX(faker.custom.uiHelperContext());
    const result = uiOneOfValueX(label, input, undefined);
    expect(result).toEqual([
        {
            label: `intl(${label})`,
            type: 'SINGLE_VALUE',
            display: value,
        },
    ]);
});

test('valueX with quantity', () => {
    const label = faker.custom.messageId();
    const mgoQuantity = mockQuantity();
    const input = {
        valueQuantity: mgoQuantity,
    };

    const uiOneOfValueX = oneOfValueX(faker.custom.uiHelperContext());
    const result = uiOneOfValueX(label, input, undefined);
    expect(result).toEqual([
        {
            label: `intl(${label})`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
        },
    ]);
});

test('valueX with custom prefix', () => {
    const label = faker.custom.messageId();
    const value = faker.lorem.word();
    const prefix = faker.lorem.word();
    const input = {
        [`${prefix}String`]: value,
    };

    const uiOneOfValueX = oneOfValueX(faker.custom.uiHelperContext());
    const result = uiOneOfValueX(label, input, prefix);
    expect(result).toEqual([
        {
            label: `intl(${label})`,
            type: 'SINGLE_VALUE',
            display: value,
        },
    ]);
});

test('valueX with null value', () => {
    const label = faker.custom.messageId();

    const uiOneOfValueX = oneOfValueX(faker.custom.uiHelperContext());
    const result = uiOneOfValueX(label, null, undefined);
    expect(result).toEqual([]);
});

test('valueX where prefixed value not found', () => {
    const label = faker.custom.messageId();
    const value = faker.lorem.word();
    const prefix = faker.lorem.word();
    const input = {
        valueString: value,
    };

    const uiOneOfValueX = oneOfValueX(faker.custom.uiHelperContext());
    const result = uiOneOfValueX(label, input, prefix);
    expect(result).toEqual([]);
});
