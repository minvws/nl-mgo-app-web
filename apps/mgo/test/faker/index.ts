import { faker as originalFaker } from '@faker-js/faker';
import { authState } from './authState';
import { dataServiceId } from './dataServiceId';
import { healthCategory, healthCategorySlug } from './healthCategory';
import { healthcareOrganization } from './healthcareOrganization';
import { resource } from './resource';
import { userInfo } from './userInfo';

const custom = {
    healthcareOrganization,
    dataServiceId,
    userInfo,
    authState,
    healthCategory,
    healthCategorySlug,
    resource,
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
