import { faker } from '@faker-js/faker';
import { type ValueOptions } from '../../src/ui/types';
import { createMockDataFactory } from './factory';
import { mockOptionalFields } from './helpers';

export const valueOptions = createMockDataFactory<ValueOptions>(() => {
    return mockOptionalFields({
        summary: faker.datatype.boolean(),
    });
});
