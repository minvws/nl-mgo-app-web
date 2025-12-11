import { faker as originalFaker, type Faker } from '@faker-js/faker';
import { fhirFaker } from '@minvws/mgo-fhir/test/shared';
import { authState } from './authState';
import { healthcareOrganization } from './healthcareOrganization';
import { mgoResource } from './mgoResource';
import { resource } from './resource';
import { userInfo } from './userInfo';

const custom = {
    healthcareOrganization,
    userInfo,
    authState,
    resource,
    mgoResource,
};

const faker: Faker = {
    ...originalFaker,
} as Faker;

type CustomizedFaker = typeof faker & {
    custom: typeof custom;
    fhir: typeof fhirFaker;
};

const customizedFaker = faker as CustomizedFaker;
customizedFaker.custom = custom;
customizedFaker.fhir = fhirFaker;

export { customizedFaker as faker };
