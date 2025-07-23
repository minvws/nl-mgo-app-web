import { faker } from '@faker-js/faker';
import { fhirFaker, fhirR4Faker } from '@minvws/mgo-fhir/test/shared';

type CustomizedFaker = typeof faker & {
    fhir: typeof fhirFaker;
    fhirR4: typeof fhirR4Faker;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhirFaker;
customizedFaker.fhirR4 = fhirR4Faker;

export { customizedFaker as faker };
