import { faker } from '@faker-js/faker';
import { type MedicationPackageBatch } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { dateTime } from '../type';

export const medicationPackageBatch = createMockDataFactory<MedicationPackageBatch>(() => ({
    expirationDate: dateTime(),
    lotNumber: faker.number.int(1000).toString(),
}));
