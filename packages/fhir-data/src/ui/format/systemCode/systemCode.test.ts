import { faker } from '$test';
import { expect, test, vi } from 'vitest';
import { systemCode } from './systemCode';

test('systemCode uses the translated code if available', () => {
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(true);

    const value = faker.mgo.coding();
    const expected = `intl(system.code.${value.system}|${value.code})`;

    const formatSystemCode = systemCode(context);
    const result = formatSystemCode(value);

    expect(result).toBe(expected);
});

test('systemCode uses the display value if code can not be translated', () => {
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);

    const value = faker.mgo.coding();
    const expected = value.display;

    const formatSystemCode = systemCode(context);
    const result = formatSystemCode(value);

    expect(result).toBe(expected);
});

test('systemCode uses the raw code if there is NO display AND code can not be translated', () => {
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);

    const value = faker.mgo.coding();
    value.display = undefined;
    const expected = value.code;

    const formatSystemCode = systemCode(context);
    const result = formatSystemCode(value);

    expect(result).toBe(expected);
});
