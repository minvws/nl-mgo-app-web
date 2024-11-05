import { faker } from '@faker-js/faker';
import { type UiEntryOptions } from '../../src/ui/types';
import { createMockDataFactory } from './factory';
import { mockOptionalFields } from './helpers';

export const valueOptions = createMockDataFactory<UiEntryOptions>(() => {
    return mockOptionalFields({
        summary: faker.datatype.boolean(),
    });
});
