import { faker } from '$test';
import { expect, test } from 'vitest';
import { boolean } from './boolean';

test('boolean - true', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const context = faker.custom.uiContext();
    const result = boolean(context)(label, true, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: `intl(fhir.boolean.true)`,
        ...options,
    });
});

test('boolean - false', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const context = faker.custom.uiContext();
    const result = boolean(context)(label, false, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: `intl(fhir.boolean.false)`,
        ...options,
    });
});

test('boolean - undefined', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const context = faker.custom.uiContext();
    const result = boolean(context)(label, undefined, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: undefined,
        ...options,
    });
});
