import { type EncounterHospitalization } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { codeableConcept } from '../type';

export const encounterHospitalization = createMockDataFactory<EncounterHospitalization>(() => {
    return {
        admitSource: codeableConcept(),
        dischargeDisposition: codeableConcept(),
    };
});
