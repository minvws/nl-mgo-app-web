import { faker } from '@faker-js/faker';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { type Dosage } from 'fhir/r3';
import { codeableConcept } from './codeableConcept';
import { quantity } from './quantity';
import { range } from './range';
import { ratio } from './ratio';
import { timing } from './timing';

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
