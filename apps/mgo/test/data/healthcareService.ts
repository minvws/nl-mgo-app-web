import { type HealthcareService } from '$/types/Addressing';
import { faker } from '@faker-js/faker';
import { createMockDataFactory } from './factory';

export const healthcareService = createMockDataFactory<HealthcareService>(() => ({
    medmij_id: faker.string.sample(),
    organization_type: faker.string.sample(),
    id_type: faker.string.sample(),
    id_value: faker.string.sample(),
    dataservices: [],
}));
