import { faker } from '@faker-js/faker';
import { NictizNlProfile } from '../../../../src/nictizNlProfile.js';

export const nictizNlProfile = () => {
    return faker.helpers.arrayElement([
        `http://fhir.nl/fhir/StructureDefinition/nl-core-${faker.lorem.word()}`,
        `http://nictiz.nl/fhir/StructureDefinition/zib-${faker.lorem.word()}`,
        `http://nictiz.nl/fhir/StructureDefinition/gp-${faker.lorem.word()}`,
    ]) as NictizNlProfile;
};
