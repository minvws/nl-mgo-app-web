import { faker } from '@faker-js/faker';
import { FhirVersion } from '@minvws/mgo-fhir';

export const fhirVersion = () => {
    return faker.helpers.arrayElement(['R3', 'R4']) as FhirVersion;
};
