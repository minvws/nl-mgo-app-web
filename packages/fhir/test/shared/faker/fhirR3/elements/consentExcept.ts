import { type ConsentExcept } from '@minvws/mgo-fhir/r3';
import { createMockFactory, mockArray } from '@minvws/mgo-utils/test/shared';
import { code, codeableConcept, coding, period } from '../type/index.js';
import { consentActor } from './consentActor.js';
import { consentData } from './consentData.js';

export const consentExcept = createMockFactory<ConsentExcept>(() => {
    return {
        action: mockArray({ max: 5, factory: codeableConcept }),
        actor: mockArray({ max: 5, factory: consentActor }),
        class: mockArray({ max: 5, factory: coding }),
        code: mockArray({ max: 5, factory: coding }),
        data: mockArray({ max: 5, factory: consentData }),
        dataPeriod: period(),
        purpose: mockArray({ max: 5, factory: coding }),
        securityLabel: mockArray({ max: 5, factory: coding }),
        type: code(['deny', 'permit']),
    };
});
