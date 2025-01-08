import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoReference } from '../../../parse/type';
import * as special from './reference';

test('reference', () => {
    const label = faker.custom.messageId();

    const value: MgoReference = {
        display: faker.lorem.word(),
        reference: faker.lorem.word(),
    };
    const result = special.reference(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'REFERENCE_VALUE',
        display: value.display,
        reference: value.reference,
    });
});
