import { faker as originalFaker } from '@faker-js/faker';
import { healthcareOrganizationDTO } from './load';
import { healthcareOrganization } from './healthcareOrganization';
import { dataServiceId } from './dataServiceId';

const custom = {
    healthcareOrganizationDTO,
    healthcareOrganization,
    dataServiceId,
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
