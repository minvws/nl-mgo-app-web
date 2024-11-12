import { faker } from '@faker-js/faker';
import { type MedicationPackageBatch } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { mockOptionalFields } from '../../helpers';
import { dateTime } from '../type';

export const medicationPackageBatch = createMockDataFactory<MedicationPackageBatch>(() => {
    return mockOptionalFields({
        expirationDate: dateTime(),
        lotNumber: faker.number.int(1000).toString(),
    });
});
