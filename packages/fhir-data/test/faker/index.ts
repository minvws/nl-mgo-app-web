import { faker as originalFaker } from '@faker-js/faker';
import { type } from './fhir/type';
import * as elements from './fhir/elements';
import * as helpers from './helpers';
import * as uiSchema from './uiSchema';
import { nullish } from './nullish';

const faker = {
    ...originalFaker,
    fhir: {
        ...type,
        ...elements,
    },
    uiSchema,
    custom: {
        ...helpers,
        nullish,
    },
};

export { faker };
