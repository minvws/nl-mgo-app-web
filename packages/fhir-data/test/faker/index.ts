import { faker } from '@faker-js/faker';
import * as type from './fhir/type';
import * as elements from './fhir/elements';
import * as resources from './fhir/resources';
import * as helpers from './helpers';
import * as uiSchema from './uiSchema';
import * as nictizNlProfile from './fhir/nictizNlProfile';
import { nullish } from './nullish';

const fhir = {
    ...type,
    ...elements,
    ...resources,
    ...nictizNlProfile,
};

const custom = {
    ...helpers,
    nullish,
};

type CustomizedFaker = typeof faker & {
    fhir: typeof fhir;
    custom: typeof custom;
    uiSchema: typeof uiSchema;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhir;
customizedFaker.custom = custom;
customizedFaker.uiSchema = uiSchema;

export { customizedFaker as faker };
