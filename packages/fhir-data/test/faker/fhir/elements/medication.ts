import { faker } from '@faker-js/faker';
import {
    type MedicationPackageBatch,
    type MedicationPackageContent,
    type MedicationPackage,
    type MedicationIngredient,
} from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../helpers/mockOptionalFields';
import { type } from '../type';
import { collection } from '../../helpers';

export const medicationPackageBatch = createMockDataFactory<MedicationPackageBatch>(() => {
    return mockOptionalFields({
        expirationDate: type.dateTime(),
        lotNumber: faker.number.int(1000).toString(),
    });
});

export const medicationPackageContent = createMockDataFactory<MedicationPackageContent>(() => {
    return mockOptionalFields({
        amount: type.quantity(),
        itemCodeableConcept: type.codableConcept(),
        itemReference: type.reference(),
    });
});

export const medicationIngredient = createMockDataFactory<MedicationIngredient>(() => {
    return mockOptionalFields({
        amount: type.ratio(),
        isActive: faker.datatype.boolean(),
        itemCodeableConcept: type.codableConcept(),
        itemReference: type.reference(),
    });
});

export const medicationPackage = createMockDataFactory<MedicationPackage>(() => {
    return mockOptionalFields({
        batch: collection({ max: 5, factory: medicationPackageBatch }),
        container: type.codableConcept(),
        content: collection({ max: 5, factory: medicationPackageContent }),
    });
});
