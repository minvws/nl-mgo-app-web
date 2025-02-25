import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { type MgoIdentifier } from '../../../parse/type';
import { identifier } from './identifier';

test('identifier', () => {
    const label = faker.custom.fhirMessageId();

    const mgoIdentifier: MgoIdentifier = {
        use: undefined,
        system: faker.internet.url(),
        value: faker.lorem.sentence(),
        type: {
            text: undefined,
            coding: [
                {
                    code: faker.fhir.code(),
                    system: faker.internet.url(),
                    display: faker.lorem.sentence(),
                },
            ],
        },
    };
    const result = identifier(faker.custom.uiHelperContext())(label, mgoIdentifier);
    expect(result).toEqual({
        label: testMessage(label),
        type: 'SINGLE_VALUE',
        display: mgoIdentifier.value,
    });
});
