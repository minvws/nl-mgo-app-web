import { faker } from '$test';
import { expect, test, type MockedFunction } from 'vitest';
import { type MgoQuantity } from '../../../parse/type';
import { count } from './count';

test('count returns basic format when there is no translation', () => {
    const context = faker.custom.uiHelperContext();
    const hasMessage = context.hasMessage as unknown as MockedFunction<typeof context.hasMessage>;

    hasMessage.mockReturnValue(false);

    const value: MgoQuantity = faker.fhir.quantity() as MgoQuantity;
    const expected = `${value.value} ${value.unit}`;

    const formatCount = count(context);
    const result = formatCount(value);

    expect(result).toBe(expected);
});

test('count returns translation when available', () => {
    const context = faker.custom.uiHelperContext();
    const hasMessage = context.hasMessage as unknown as MockedFunction<typeof context.hasMessage>;

    hasMessage.mockReturnValue(true);

    const value: MgoQuantity = faker.fhir.quantity() as MgoQuantity;
    const expected = `intl(system.count.${value.system}|${value.code})`;

    const formatCount = count(context);
    const result = formatCount(value);

    expect(result).toBe(expected);
});
