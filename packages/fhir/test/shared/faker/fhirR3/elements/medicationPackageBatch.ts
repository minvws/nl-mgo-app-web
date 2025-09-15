import { faker } from '@faker-js/faker';
import { type MedicationPackageBatch } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { dateTime } from '../type/index.js';

export const medicationPackageBatch = createMockFactory<MedicationPackageBatch>(() => ({
    expirationDate: dateTime(),
    lotNumber: faker.number.int(1000).toString(),
}));
