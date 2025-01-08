import { faker } from '$test';
import { expect, test } from 'vitest';
import { format } from '../../format';
import { valueWithMax } from './valueWithMax';

test('valueWithMax', () => {
    const label = faker.custom.messageId();

    const value = faker.number.int();
    const max = faker.number.int();

    const uiValueWithMax = valueWithMax(faker.custom.uiHelperContext());
    const result = uiValueWithMax(label, value, max);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: format.valueWithMaxValue(value, max),
    });
});
