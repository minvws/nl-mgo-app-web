import { faker } from '$test';
import { expect, test } from 'vitest';
import { numberToString } from '../../helpers/index.js';
import { SingleValue } from '../../types/schema.js';
import { unsignedInt } from './unsignedInt.js';

test('unsignedInt', () => {
    const label = faker.custom.fhirMessageId();
    const value = faker.mgo.unsignedInt();
    const result = unsignedInt(faker.ui.context())(label, value);
    expect(result).toMatchObject<Partial<SingleValue>>({
        type: 'SINGLE_VALUE',
        value: { display: numberToString(value?.value) },
    });
});
