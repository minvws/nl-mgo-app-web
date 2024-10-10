import { type EncounterHospitalization } from '../../../../src/fhir';
import { createMockDataFactory } from '../../factory';
import { codeableConcept } from '../type';

export const encounterHospitalization = createMockDataFactory<EncounterHospitalization>(() => {
    return {
        admitSource: codeableConcept(),
        dischargeDisposition: codeableConcept(),
    };
});
