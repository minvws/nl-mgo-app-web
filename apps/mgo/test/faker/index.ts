import { faker as originalFaker } from '@faker-js/faker';
import { healthcareOrganizationDTO } from './load';
import { healthcareOrganization } from './healthcareOrganization';

const faker = {
    ...originalFaker,
    custom: {
        healthcareOrganizationDTO,
        healthcareOrganization,
    },
};

export { faker };
