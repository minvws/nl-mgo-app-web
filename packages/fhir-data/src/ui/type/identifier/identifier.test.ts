import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoIdentifier } from '../../../parse/type';
import { identifier } from './identifier';

test('identifier', () => {
    const label = faker.custom.messageId();

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
        label: `intl(${label})`,
        type: 'SINGLE_VALUE',
        display: mgoIdentifier.value,
    });
});
