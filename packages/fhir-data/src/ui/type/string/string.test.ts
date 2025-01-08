import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoString } from '../../../parse/type';
import { toString } from '../../helpers';
import { string } from './string';

test('string', () => {
    const label = faker.custom.messageId();
    const value: MgoString = faker.fhir.string();
    const result = string(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: toString(value),
    });
});
