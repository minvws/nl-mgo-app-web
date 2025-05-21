import { faker } from '$test';
import { expect, test } from 'vitest';
import * as format from './value';
import { numberToString } from '../../helpers';

test('format valueWithUnit return undefined for nullish value', () => {
    const value = faker.custom.nullish();
    const unit = faker.lorem.word();
    const result = format.valueWithUnit(value, unit);
    expect(result).toBeUndefined();
});

test('format valueWithUnit return value for nullish unit', () => {
    const value = faker.number.float();
    const unit = faker.custom.nullish();
    const result = format.valueWithUnit(value, unit);
    expect(result).toEqual(numberToString(value));
});

test('format valueWithUnit', () => {
    const value = faker.number.float();
    const unit = faker.lorem.word();
    const result = format.valueWithUnit(value, unit);
    expect(result).toEqual(`${numberToString(value)} ${unit}`);
});

test('format valueWithMaxValue return undefined for nullish value', () => {
    const value = faker.custom.nullish();
    const maxValue = faker.number.float();
    const result = format.valueWithMaxValue(value, maxValue);
    expect(result).toBeUndefined();
});

test('format valueWithMaxValue return value for nullish max', () => {
    const value = faker.number.float();
    const maxValue = faker.custom.nullish();
    const result = format.valueWithMaxValue(value, maxValue);
    expect(result).toEqual(numberToString(value));
});

test('format valueWithMaxValue', () => {
    const value = faker.number.int();
    const maxValue = faker.number.int();
    const result = format.valueWithMaxValue(value, maxValue);
    expect(result).toEqual(`${numberToString(value)} / ${numberToString(maxValue)}`);
});
