import { faker as originalFaker } from '@faker-js/faker';
import { healthcareOrganizationDTO } from './load';
import { healthcareOrganization } from './healthcareOrganization';

const custom = {
    healthcareOrganizationDTO,
    healthcareOrganization,
};

const faker = {
    ...originalFaker,
};

type CustomizedFaker = typeof faker & {
    custom: typeof custom;
};

const customizedFaker = faker as CustomizedFaker;
customizedFaker.custom = custom;

export { customizedFaker as faker };
