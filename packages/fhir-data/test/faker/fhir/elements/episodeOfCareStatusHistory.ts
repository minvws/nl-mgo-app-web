import { type EpisodeOfCareStatusHistory } from 'fhir/r3';
import { createMockDataFactory } from '../../factory';
import { code, period } from '../type';

export const episodeOfCareStatusHistory = createMockDataFactory<EpisodeOfCareStatusHistory>(() => {
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
