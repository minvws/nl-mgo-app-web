import { type EpisodeOfCareStatusHistory } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { code, period } from '../type/index.js';

export const episodeOfCareStatusHistory = createMockFactory<EpisodeOfCareStatusHistory>(() => {
    return {
        status: code([
            'planned',
            'waitlist',
            'active',
            'onhold',
            'finished',
            'cancelled',
            'entered-in-error',
        ]),
        period: period(),
    };
});
