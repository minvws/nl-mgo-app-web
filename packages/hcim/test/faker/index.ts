import { faker } from '@faker-js/faker';
import { fhirFaker } from '@minvws/mgo-fhir/test/shared';

type CustomizedFaker = typeof faker & {
    fhir: typeof fhirFaker;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhirFaker;

export { customizedFaker as faker };
