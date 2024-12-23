import { faker } from '@faker-js/faker';
import * as helpers from './helpers';
import { i18nContext } from './i18nContext';
import { uiEntryOptions } from './uiEntryOptions';
import { messageId } from './messageId';
import { nullish } from './nullish';
import { fhir } from './fhir';
import { fhirR4 } from './fhirR4';

const custom = {
    ...helpers,
    nullish,
    messageId,
    i18nContext,
    uiEntryOptions,
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
