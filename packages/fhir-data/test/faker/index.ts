import { faker } from '@faker-js/faker';
import { fhir } from './fhir';
import { fhirR4 } from './fhirR4';
import * as helpers from './helpers';
import { fhirMessageId } from './messageId';
import { mgo } from './mgo';
import { nullish } from './nullish';
import { uiHelperContext } from './uiHelperContext';

const custom: {
    [K in keyof typeof helpers]: (typeof helpers)[K];
} & {
    nullish: typeof nullish;
    fhirMessageId: typeof fhirMessageId;
    uiHelperContext: typeof uiHelperContext;
} = {
    ...helpers,
    nullish,
    fhirMessageId,
    uiHelperContext,
};

type CustomizedFaker = typeof faker & {
    mgo: typeof mgo;
    fhir: typeof fhir;
    fhirR4: typeof fhirR4;
    custom: typeof custom;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.mgo = mgo;
customizedFaker.fhir = fhir;
customizedFaker.fhirR4 = fhirR4;
customizedFaker.custom = custom;

export { customizedFaker as faker };
