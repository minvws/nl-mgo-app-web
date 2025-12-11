import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { HealthUiGroup, HealthUiSchema } from '../../../src/types/schema.js';
import { uiElement } from './uiElements.js';

export const healthUiGroup = createMockFactory<HealthUiGroup>(() => {
    return {
        label: faker.lorem.sentence(),
        children: mockArray({
            max: 4,
            factory: uiElement,
        }),
    };
});

export const healthUiSchema = createMockFactory<HealthUiSchema>(() => {
    return {
        label: faker.lorem.sentence(),
        children: mockArray({
            max: 4,
            factory: healthUiGroup,
        }),
    };
});
