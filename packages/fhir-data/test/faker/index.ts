import { faker } from '@faker-js/faker';
import { fhir } from './fhir';
import { fhirR4 } from './fhirR4';
import * as helpers from './helpers';
import { uiHelperContext } from './i18nContext';
import { messageId } from './messageId';
import { nullish } from './nullish';

const custom = {
    ...helpers,
    nullish,
    messageId,
    uiHelperContext,
};

type CustomizedFaker = typeof faker & {
    fhir: typeof fhir;
    fhirR4: typeof fhirR4;
    custom: typeof custom;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.fhir = fhir;
customizedFaker.fhirR4 = fhirR4;
customizedFaker.custom = custom;

export { customizedFaker as faker };
