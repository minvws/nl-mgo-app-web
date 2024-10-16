import { type HealthcareOrganizationDTO } from '$/services/load/types';
import { faker } from '@faker-js/faker';
import { createMockDataFactory } from '../factory';
import { address } from './address';
import { healthcareServiceDTO } from './healthcareServiceDTO';
import { healthcareOrganizationType } from './healthcareOrganizationType';

export const healthcareOrganizationDTO = createMockDataFactory<HealthcareOrganizationDTO>(() => ({
    display_name: faker.company.name(),
    active: faker.datatype.boolean(),
    identification: faker.string.sample(),
    addresses: [address()],
    types: [healthcareOrganizationType()],
    names: [],
    data_services: [healthcareServiceDTO()],
}));
