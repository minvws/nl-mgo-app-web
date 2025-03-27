import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { identifier } from './identifier';

test('identifier', () => {
    const label = faker.custom.fhirMessageId();
    const mgoIdentifier = faker.mgo.identifier();

    const result = identifier(faker.custom.uiHelperContext())(label, mgoIdentifier);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: mgoIdentifier.value,
    });
});
