import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoIdentifier } from '../../../parse/type';
import { identifier } from './identifier';

test('identifier', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoIdentifier: MgoIdentifier = {
        use: undefined,
        system: faker.internet.url(),
        value: faker.lorem.sentence(),
        type: [
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
        ],
    };
    const result = identifier(label, mgoIdentifier, options);
    expect(result).toEqual({
        label,
        type: 'identifier',
        display: mgoIdentifier.value,
        ...options,
    });
});
