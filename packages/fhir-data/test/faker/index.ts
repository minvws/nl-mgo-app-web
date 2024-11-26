import { faker } from '@faker-js/faker';
import * as helpers from './helpers';
import * as uiSchema from './uiSchema';
import { nullish } from './nullish';
import { fhir } from './fhir';
import { fhirR4 } from './fhirR4';

const custom = {
    ...helpers,
    nullish,
};

type CustomizedFaker = typeof faker & {
    fhir: typeof fhir;
    fhirR4: typeof fhirR4;
    custom: typeof custom;
    uiSchema: typeof uiSchema;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhir;
customizedFaker.fhirR4 = fhirR4;
customizedFaker.custom = custom;
customizedFaker.uiSchema = uiSchema;

export { customizedFaker as faker };
