import { faker } from '@faker-js/faker';
import { type Dosage } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { codeableConcept } from './codeableConcept.js';
import { quantity } from './quantity.js';
import { range } from './range.js';
import { ratio } from './ratio.js';
import { timing } from './timing.js';

export const dosage = createMockFactory<Dosage>(() => {
    return {
        additionalInstruction: mockArray({ factory: codeableConcept, max: 3 }),
        asNeededBoolean: faker.datatype.boolean(),
        asNeededCodeableConcept: codeableConcept(),
        doseRange: range(),
        doseQuantity: quantity(),
        maxDosePerAdministration: quantity(),
        maxDosePerLifetime: quantity(),
        patientInstruction: faker.lorem.sentence(),
        rateRatio: ratio(),
        rateQuantity: quantity(),
        route: codeableConcept(),
        sequence: faker.number.int(),
        site: codeableConcept(),
        test: faker.lorem.sentence(),
        timing: timing(),
    };
});
