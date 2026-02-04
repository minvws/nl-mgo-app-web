import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { HealthUiGroup, HealthUiSchema } from '../../../src/types/schema.js';
import { uiElement } from './uiElements.js';

export const healthUiGroup = createMockFactory<HealthUiGroup>(() => {
    const label = faker.lorem.sentence();
    return {
        id: label,
        label,
        children: mockArray({
            max: 4,
            factory: uiElement,
        }),
    };
});

export const healthUiSchema = createMockFactory<HealthUiSchema>(() => {
    const label = faker.lorem.sentence();
    return {
        id: label,
        label,
        children: mockArray({
            max: 4,
            factory: healthUiGroup,
        }),
    };
});
