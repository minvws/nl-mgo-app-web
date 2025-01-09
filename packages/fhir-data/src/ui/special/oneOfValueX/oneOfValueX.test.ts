import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoQuantity, type MgoString } from '../../../parse/type';
import { quantity } from '../../type/quantity/quantity';
import { string } from '../../type/string/string';
import { oneOfValueX } from './oneOfValueX';

test('valueX with string', () => {
    const label = faker.custom.messageId();
    const value = faker.lorem.word();
    const input = {
        valueString: value as MgoString,
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, undefined);
    const expected = string(context)(label, input.valueString);

    expect(result).toEqual([expected]);
});

test('valueX with quantity', () => {
    const label = faker.custom.messageId();
    const mgoQuantity = faker.fhir.quantity() as MgoQuantity;
    const input = {
        valueQuantity: mgoQuantity,
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, undefined);
    const exptected = quantity(context)(label, input.valueQuantity);

    expect(result).toEqual([exptected]);
});

test('valueX with custom prefix', () => {
    const label = faker.custom.messageId();
    const value = faker.lorem.word();
    const prefix = faker.lorem.word();
    const input = {
        [`${prefix}String`]: value as MgoString,
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, prefix);
    const expected = string(context)(label, input[`${prefix}String`]);

    expect(result).toEqual([expected]);
});

test('valueX with null value', () => {
    const label = faker.custom.messageId();

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
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

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, prefix);
    expect(result).toEqual([]);
});
