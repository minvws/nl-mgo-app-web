import { collection, mockOptionalFields } from '$test/faker/helpers';
import { faker } from '@faker-js/faker';
import { type Dosage } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { codeableConcept, quantity, range, ratio, timing } from './general';

export const dosage = createMockDataFactory<Dosage>(() => {
    return mockOptionalFields({
        additionalInstruction: collection({ factory: codeableConcept, max: 3 }),
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
    });
});
