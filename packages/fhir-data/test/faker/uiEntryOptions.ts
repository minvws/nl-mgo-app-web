import { faker } from '@faker-js/faker';
import { type UiEntryOptions } from '../../src/ui/types';
import { createMockDataFactory } from './factory';
import { mockOptionalFields } from './helpers';

export const uiEntryOptions = createMockDataFactory<UiEntryOptions>(() => {
    return mockOptionalFields({
        showEmpty: faker.datatype.boolean(),
    });
});
