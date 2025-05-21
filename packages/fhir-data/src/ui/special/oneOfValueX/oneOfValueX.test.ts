import { faker } from '$test';
import { expect, test, vi } from 'vitest';
import { getTypes } from '../../type';
import { quantity } from '../../type/quantity/quantity';
import { string } from '../../type/string/string';
import { type HealthUiGroup } from '../../types';
import { oneOfValueX } from './oneOfValueX';

vi.mock('../../type', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const { getTypes } = await importOriginal<typeof import('../../type')>();
    return { getTypes: vi.fn(getTypes) };
});

test('valueX with string', () => {
    const label = faker.custom.fhirMessageId();
    const input = {
        valueString: faker.mgo.string(),
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, undefined);
    const expected = string(context)(label, input.valueString);

    expect(result).toEqual([expected]);
});

test('valueX with quantity', () => {
    const label = faker.custom.fhirMessageId();
    const input = {
        valueQuantity: faker.mgo.quantity(),
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, undefined);
    const expected = quantity(context)(label, input.valueQuantity);

    expect(result).toEqual([expected]);
});

test('valueX with custom prefix', () => {
    const label = faker.custom.fhirMessageId();
    const prefix = faker.lorem.word();
    const input = {
        [`${prefix}String`]: faker.mgo.string(),
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input, prefix);
    const expected = string(context)(label, input[`${prefix}String`]);

    expect(result).toEqual([expected]);
});

test('valueX with null value', () => {
    const label = faker.custom.fhirMessageId();
    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, null, undefined);
    expect(result).toEqual([]);
});

test('valueX where prefixed value not found', () => {
    const label = faker.custom.fhirMessageId();
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

test('valueX always returns ui elements, even if a helper returns a group', () => {
    const group: HealthUiGroup = {
        label: faker.lorem.sentence(),
        children: [
            {
                type: 'SINGLE_VALUE',
                label: faker.lorem.sentence(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    vi.mocked(getTypes).mockReturnValueOnce({
        string: () => group,
    } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    const label = faker.custom.fhirMessageId();
    const value = faker.lorem.word();
    const input = {
        valueString: value,
    };

    const context = faker.custom.uiHelperContext();
    const uiOneOfValueX = oneOfValueX(context);
    const result = uiOneOfValueX(label, input);
    expect(result).toEqual([...group.children]);
});
