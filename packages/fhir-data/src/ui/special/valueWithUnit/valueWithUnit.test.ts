import { faker } from '$test';
import { expect, test } from 'vitest';
import { format } from '../../format';
import { valueWithUnit } from './valueWithUnit';

test('valueWithUnit', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const value = faker.number.int();
    const unit = faker.lorem.word();

    const uiValueWithUnit = valueWithUnit(faker.custom.i18nContext());
    const result = uiValueWithUnit(label, value, unit, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: format.valueWithUnit(value, unit),
        ...options,
    });
});
