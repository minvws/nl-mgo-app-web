import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type EncounterHospitalization } from 'fhir/r3';
import { codeableConcept } from '../type';

export const encounterHospitalization = createMockFactory<EncounterHospitalization>(() => {
    return {
        admitSource: codeableConcept(),
        dischargeDisposition: codeableConcept(),
    };
});
