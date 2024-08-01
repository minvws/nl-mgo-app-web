import { faker as originalFaker } from '@faker-js/faker';
import { type } from './fhir/type';
import * as elements from './fhir/elements';
import * as helpers from './helpers';

const faker = {
    ...originalFaker,
    fhir: {
        ...type,
        ...elements,
    },
    custom: {
        ...helpers,
    },
};

export { faker };
