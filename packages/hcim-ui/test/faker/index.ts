import { faker } from '@faker-js/faker';
import { fhirFaker } from '@minvws/mgo-fhir/test/shared';
import { mgoFaker } from '@minvws/mgo-hcim-parse/test/shared';
import { nullish } from '@minvws/mgo-utils/test/shared';
import { uiFaker } from '../shared';
import { fhirMessageId } from './messageId';

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
    fhir: typeof fhirFaker;
    custom: typeof custom;
};

const customizedFaker = faker as CustomizedFaker;

customizedFaker.ui = uiFaker;
customizedFaker.mgo = mgoFaker;
customizedFaker.fhir = fhirFaker;
customizedFaker.custom = custom;

export { customizedFaker as faker };
