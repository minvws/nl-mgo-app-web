import { type HealthcareServiceDTO } from '$/services/load/types';
import { faker } from '@faker-js/faker';
import { createMockDataFactory } from '../factory';

export const healthcareServiceDTO = createMockDataFactory<HealthcareServiceDTO>(() => ({
    id: faker.number.int(),
    name: faker.string.sample(),
    interface_version: faker.number.int(),
    auth_endpoint: faker.internet.url(),
    token_endpoint: faker.internet.url(),
    roles: [],
}));
