import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoReference } from '../../../parse/type';
import * as special from './reference';

test('reference', () => {
    const label = faker.custom.fhirMessageId();

    const value: MgoReference = {
        display: faker.lorem.word(),
        reference: faker.lorem.word(),
    };
    const result = special.reference(faker.custom.uiHelperContext())(label, value);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'REFERENCE_VALUE',
        display: value.display,
        reference: value.reference,
    });
});
