import { type EncounterHospitalization } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { codeableConcept } from '../type/index.js';

export const encounterHospitalization = createMockFactory<EncounterHospitalization>(() => {
    return {
        admitSource: codeableConcept(),
        dischargeDisposition: codeableConcept(),
    };
});
