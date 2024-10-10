import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoCoding } from '../../../parse/type';
import { format } from '../../format';
import * as general from './coding';

test('coding', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoCoding: MgoCoding = {
        code: faker.fhir.code(),
        system: faker.internet.url(),
        display: faker.lorem.sentence(),
    };
    const result = general.coding(label, mgoCoding, options);
    expect(result).toEqual({
        label,
        type: 'coding',
        display: `${mgoCoding.display} (${format.codeWithSystem(mgoCoding.code, mgoCoding.system)})`,
        ...options,
    });
});

test('codingWithoutSystem', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoCoding: MgoCoding = {
        code: faker.fhir.code(),
        system: faker.internet.url(),
        display: faker.lorem.sentence(),
    };
    const result = general.codingWithoutSystem(label, mgoCoding, options);
    expect(result).toEqual({
        label,
        type: 'coding',
        display: `${mgoCoding.display}`,
        ...options,
    });
});
