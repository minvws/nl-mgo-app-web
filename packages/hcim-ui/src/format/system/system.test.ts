import { faker } from '$test';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type UiContext } from '../../context/index.js';
import { systemCode } from '../systemCode/systemCode.js';
import { system } from './system.js';

const mockSystemCode = systemCode as unknown as MockedFunction<typeof systemCode>;

vi.mock('../systemCode/systemCode', () => ({
    systemCode: vi.fn((_context: UiContext) => vi.fn()),
}));

test('system returns system code translation when it is a summary', () => {
    const systemCodeTranslation = faker.lorem.sentence();
    mockSystemCode.mockReturnValue(() => systemCodeTranslation);
    const context = faker.ui.context({
        isSummary: true,
    });
    const value = faker.mgo.coding();
    const formatSystem = system(context);
    const expected = systemCodeTranslation;
    const result = formatSystem(value);
    expect(result).toBe(expected);
});

test('system returns full information when display, code and system are present', () => {
    const context = faker.ui.context({
        isSummary: false,
    });
    const value = faker.mgo.coding();
    const formatSystem = system(context);
    const expected = `${value.display} (intl(fhir.code_in_system, {"code":"${value.code}","system":"${value.system}"}))`;
    const result = formatSystem(value);
    expect(result).toBe(expected);
});

test('system returns system when code is not present', () => {
    const context = faker.ui.context();

    const value = faker.mgo.coding();
    value.code = undefined;
    const expected = `${value.display} (${value.system})`;

    const formatSystem = system(context);
    const result = formatSystem(value);

    expect(result).toBe(expected);
});

test('system returns code when system is not present', () => {
    const context = faker.ui.context();

    const value = faker.mgo.coding();
    value.system = undefined;
    const expected = `${value.display} (${value.code})`;

    const formatSystem = system(context);
    const result = formatSystem(value);

    expect(result).toBe(expected);
});

test('system return display when system and code not present', () => {
    const context = faker.ui.context();

    const value = faker.mgo.coding();
    value.system = undefined;
    value.code = undefined;
    const expected = value.display;

    const formatSystem = system(context);
    const result = formatSystem(value);

    expect(result).toBe(expected);
});

test('system return undefined when system, code and display not present', () => {
    const context = faker.ui.context();

    const value = undefined;

    const formatSystem = system(context);
    const result = formatSystem(value);

    expect(result).toBeUndefined();
});
