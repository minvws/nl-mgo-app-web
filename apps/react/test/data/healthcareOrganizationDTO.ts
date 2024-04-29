import { type HealthcareOrganizationDTO } from '$/types/Organisation';
import { faker } from '@faker-js/faker';
import { createMockDataFactory } from './factory';
import { address } from './address';
import { healthcareService } from './healthcareService';
import { healthcareOrganizationType } from './healthcareOrganizationType';

export const healthcareOrganizationDTO = createMockDataFactory<HealthcareOrganizationDTO>(() => ({
    display_name: faker.company.name(),
    active: faker.datatype.boolean(),
    identification_type: faker.string.sample(),
    identification_value: faker.string.sample(),
    addresses: [address()],
    types: [healthcareOrganizationType()],
    names: [],
    data_services: [healthcareService()],
}));
