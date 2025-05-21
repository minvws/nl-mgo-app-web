import { faker } from '$test';
import { expect, test, vi } from 'vitest';
import { systemValue } from './systemValue';

test('count returns basic format when there is no translation', () => {
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);

    const value = faker.mgo.quantity();
    const expected = `${value.value} ${value.unit}`;

    const formatSystemValue = systemValue(context);
    const result = formatSystemValue(value);

    expect(result).toBe(expected);
});

test('count returns translation when available', () => {
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(true);

    const value = faker.mgo.quantity();
    const messageValues = JSON.stringify({ value: `${value.value}` });
    const expected = `intl(system.value.${value.system}|${value.code}, ${messageValues})`;

    const formatSystemValue = systemValue(context);
    const result = formatSystemValue(value);

    expect(result).toBe(expected);
});

test('count returns string without unit', () => {
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);

    const value = faker.mgo.quantity();
    value.unit = undefined;
    const expected = `${value.value}`;

    const formatSystemValue = systemValue(context);
    const result = formatSystemValue(value);

    expect(result).toBe(expected);
});
