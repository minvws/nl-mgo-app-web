import { faker } from '$test';
import { expect, test } from 'vitest';
import { boolean } from './boolean';

test('boolean - true', () => {
    const label = faker.custom.messageId();

    const context = faker.custom.uiHelperContext();
    const result = boolean(context)(label, true);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: `intl(fhir.boolean.true)`,
    });
});

test('boolean - false', () => {
    const label = faker.custom.messageId();

    const context = faker.custom.uiHelperContext();
    const result = boolean(context)(label, false);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: `intl(fhir.boolean.false)`,
    });
});

test('boolean - undefined', () => {
    const label = faker.custom.messageId();

    const context = faker.custom.uiHelperContext();
    const result = boolean(context)(label, undefined);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: undefined,
    });
});
