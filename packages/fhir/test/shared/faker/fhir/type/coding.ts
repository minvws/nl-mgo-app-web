import { faker } from '@faker-js/faker';
import { type CodingSystem } from '@minvws/mgo-fhir';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';

type FakerCoding = {
    code: string;
    system: CodingSystem;
    display: string;
    version: string;
};

export const coding = createMockFactory<FakerCoding>(() => {
    return {
        system: faker.helpers.arrayElement([
            'http://snomed.info/sct', // NOSONAR
            'http://loinc.org', // NOSONAR
            `urn:oid:${faker.phone.number().replaceAll('-', '.')}`,
            `http://fhir.nl/fhir/${faker.lorem.word()}`,
            `http://nictiz.nl/fhir/${faker.lorem.word()}`,
            `http://hl7.org/fhir/v3/${faker.lorem.word()}`,
            `http://hl7.org/fhir/v4/${faker.lorem.word()}`,
        ]),
        version: `${faker.number.int(10)}`,
        display: faker.lorem.word(),
        code: faker.lorem.word().toLocaleUpperCase(),
    } as FakerCoding;
});
