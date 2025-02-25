import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
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
    const label = faker.custom.fhirMessageId();
    const mgoDuration: MgoDuration = mockQuantity();
    const result = duration(faker.custom.uiHelperContext())(label, mgoDuration);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: format.valueWithUnit(mgoDuration.value, mgoDuration.unit),
    });
});
