import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDuration } from '../../../parse/type';
import { format } from '../../format';
import { duration } from './duration';

function mockQuantity() {
    return {
        value: faker.number.float(),
        comparator: faker.fhir.code(['<', '<=', '>=', '>']),
        code: faker.fhir.code(),
        system: faker.internet.url(),
        unit: faker.lorem.word(),
    };
}

test('duration', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const mgoDuration: MgoDuration = mockQuantity();
    const result = duration(faker.custom.i18nContext())(label, mgoDuration, options);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: `SINGLE_VALUE`,
        display: format.valueWithUnit(mgoDuration.value, mgoDuration.unit),
        ...options,
    });
});
