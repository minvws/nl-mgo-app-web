import { type MedicationStatement } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { collection } from '../../helpers';
import { code, codeableConcept, date, period, reference } from '../type';

export const medicationStatement = createMockDataFactory<MedicationStatement>(() => {
    return {
        resourceType: 'MedicationStatement' as const,
        basedOn: collection({ max: 2, factory: reference }),
        category: codeableConcept(),
        context: reference(),
        derivedFrom: collection({ max: 2, factory: reference }),
        dateAsserted: date(),
        effectivePeriod: period(),
        status: code(['active', 'completed', 'entered-in-error', 'intended', 'stopped', 'on-hold']),
        subject: reference(),
        taken: code(['y', 'n', 'unk', 'na']),
    };
});
