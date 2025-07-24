import { faker } from '@faker-js/faker';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type MedicationPackageBatch } from 'fhir/r3';
import { dateTime } from '../type/index.js';

export const medicationPackageBatch = createMockFactory<MedicationPackageBatch>(() => ({
    expirationDate: dateTime(),
    lotNumber: faker.number.int(1000).toString(),
}));
