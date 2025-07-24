import { faker } from '@faker-js/faker';
import { fhirR3Faker } from '@minvws/mgo-fhir/test/shared';

type CustomizedFaker = typeof faker & {
    fhir: typeof fhirR3Faker;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhirR3Faker;

export { customizedFaker as faker };
