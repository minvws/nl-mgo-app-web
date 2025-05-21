import { collection } from '$test/faker/helpers';
import { type ConsentExcept } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code, codeableConcept, coding, period } from '../type';
import { consentActor } from './consentActor';
import { consentData } from './consentData';

export const consentExcept = createMockDataFactory<ConsentExcept>(() => {
    return {
        action: collection({ max: 5, factory: codeableConcept }),
        actor: collection({ max: 5, factory: consentActor }),
        class: collection({ max: 5, factory: coding }),
        code: collection({ max: 5, factory: coding }),
        data: collection({ max: 5, factory: consentData }),
        dataPeriod: period(),
        purpose: collection({ max: 5, factory: coding }),
        securityLabel: collection({ max: 5, factory: coding }),
        type: code(['deny', 'permit']),
    };
});
