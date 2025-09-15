import { faker } from '@faker-js/faker';
import { fhirR3Faker } from '@minvws/mgo-fhir/test/shared';
import { mgoFaker } from '@minvws/mgo-hcim-parse/test/shared';
import { nullish } from '@minvws/mgo-utils/test/shared';
import { uiFaker } from '../shared/index.js';
import { fhirMessageId } from './messageId.js';

const custom: {
    fhirMessageId: typeof fhirMessageId;
    nullish: typeof nullish;
} = {
    fhirMessageId,
    nullish,
};

type CustomizedFaker = typeof faker & {
    ui: typeof uiFaker;
    mgo: typeof mgoFaker;
    fhir: typeof fhirR3Faker;
    custom: typeof custom;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.ui = uiFaker;
customizedFaker.mgo = mgoFaker;
customizedFaker.fhir = fhirR3Faker;
customizedFaker.custom = custom;

export { customizedFaker as faker };
