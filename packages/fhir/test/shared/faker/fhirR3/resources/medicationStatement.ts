import { type MedicationStatement } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { code, codeableConcept, date, period, reference } from '../type/index.js';

export const medicationStatement = createMockFactory<MedicationStatement>(() => {
    return {
        resourceType: 'MedicationStatement' as const,
        basedOn: mockArray({ max: 2, factory: reference }),
        category: codeableConcept(),
        context: reference(),
        derivedFrom: mockArray({ max: 2, factory: reference }),
        dateAsserted: date(),
        effectivePeriod: period(),
        status: code(['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold']),
        subject: reference(),
        taken: code(['y', 'n', 'unk', 'na']),
    };
});
