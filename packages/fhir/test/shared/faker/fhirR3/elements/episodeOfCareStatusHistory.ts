import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { type EpisodeOfCareStatusHistory } from 'fhir/r3';
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
