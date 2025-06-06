import { faker } from '@faker-js/faker';
import { FhirVersion } from '@minvws/mgo-fhir-types';

export const fhirVersion = () => {
    return faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]) as FhirVersion;
};
