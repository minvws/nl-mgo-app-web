import { faker as originalFaker } from '@faker-js/faker';
import { authState } from './authState';
import { dataServiceId } from './dataServiceId';
import { healthcareOrganization } from './healthcareOrganization';
import { healthcareOrganizationDTO } from './load';
import { userInfo } from './userInfo';

const custom = {
    healthcareOrganizationDTO,
    healthcareOrganization,
    dataServiceId,
    userInfo,
    authState,
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
