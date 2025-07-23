import { faker } from '@faker-js/faker';
import { fhirR3Faker, fhirR4Faker } from '@minvws/mgo-fhir/test/shared';

type CustomizedFaker = typeof faker & {
    fhir: typeof fhirR3Faker;
    fhirR4: typeof fhirR4Faker;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhirR3Faker;
customizedFaker.fhirR4 = fhirR4Faker;

export { customizedFaker as faker };
